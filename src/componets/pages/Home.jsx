import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/conf";
import { Container, Loading, PostCard } from "../Index";

const Home = () => {
  const [loading, setloading] = useState(true);
  const [posts, setposts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
        setloading(false);
      }
    });
  }, []);
  if (posts.length === 0) {
    return <Loading></Loading>;
  }
  return (
    !loading && (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post}></PostCard>
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  );
};

export default Home;
