import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { PostCard } from '@/components/PostCard';

const GET_POST_BY_ID = gql`
  query post($_id: ID!) {
    post(_id: $_id) {
      _id
      title
      content
      image
      author
    }
  }
`;

const PostDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: { _id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { post } = data;

  return (
   <PostCard post={data.post}/>
  );
};

export default PostDetailsPage;
