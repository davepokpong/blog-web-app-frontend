import { config } from 'dotenv';
config();

import { ChangeEvent, FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { TextField, Button } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $author: String!, $image: String!) {
    createPost(title: $title, content: $content, author: $author, image: $image) {
      _id
      title
      content
      author
      image
    }
  }
`;

const NewPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setTitle('');
            setContent('');
            setAuthor('');
            setImage(null);
            setImageUrl('');
            window.location.reload();
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file || null);
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            const imageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(imageUrl);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            await uploadBytes(storageRef, image);

            const downloadURL = await getDownloadURL(storageRef);
            createPost({ variables: { title, content, author, image: downloadURL } });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <Button variant="text" component="label" style={{ marginBottom: '10px' }}>
                Upload Image
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </Button>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ maxWidth: '100%' }}
                />
            )}
            <br />
            <Button type="submit" variant="contained" color="primary">
                Create Post
            </Button>
        </form>
    );
};

export default NewPostForm;