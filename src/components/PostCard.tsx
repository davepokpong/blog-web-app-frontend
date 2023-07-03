import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, Typography, CardActions, Button, Link } from "@mui/material";
import { FC } from "react"

const GET_AUTHOR = gql`
  query author($_id: ID!){
    author(_id: $_id) {
      name
    }
  }
`;

interface PostCardProps {
    post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const { loading, error, data } = useQuery(GET_AUTHOR, {
        variables: { _id: post.author },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <Link href={`/posts/${post._id}`} style={{
            textDecoration: "none"
        }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography color="text.primary" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom fontSize={"14px"}>
                        {post.content}
                    </Typography>
                    <img src={post.image} width="100%" />
                    <Typography color="text.secondary" gutterBottom fontSize={"14px"}>
                        {data.author.name}
                    </Typography>
                </CardContent>
            </Card>

        </Link>
    )
}