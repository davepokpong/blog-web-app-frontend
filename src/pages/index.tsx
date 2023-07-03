import AllPosts from '@/components/AllPosts';
import NewPostForm from '../components/NewPostForm';
import { useEffect } from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Create a New Post</h1>
      <NewPostForm />
      <AllPosts />
    </div>
  );
};

export default HomePage;