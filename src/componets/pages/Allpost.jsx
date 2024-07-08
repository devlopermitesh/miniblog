import React, { useEffect, useState } from "react";
import addwriteService from "../../appwrite/conf";
import { Container, Postform, PostCard } from "../Index";
const Allpost = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {}, []);
  addwriteService
    .getPosts([])
    .then((posts) => (posts ? setposts(posts.documents) : ""))
    .catch((error) => console.log(error));
  return (
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
  );
};

export default Allpost;
