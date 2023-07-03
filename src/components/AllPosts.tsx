import { useQuery, gql } from '@apollo/client';
import { PostCard } from './PostCard';
import { Stack } from '@mui/material';

const GET_ALL_POSTS = gql`
  query {
    posts {
      _id
      title
      content
      image
      author
    }
  }
`;

const AllPosts = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Posts</h1>
      <Stack spacing={2}>
      {data.posts.map((post: Post) => (
        // <div key={post._id}>
        //   <h3>{post.title}</h3>
        //   <p>{post.content}</p>
        //   <p>Author: {post.author}</p>
        //   <img src={post.image} alt={post.title} style={{width: "100%"}}/>
        // </div>
        <PostCard post={post}/>
      ))}
      </Stack>
    </div>
  );
};

export default AllPosts;
