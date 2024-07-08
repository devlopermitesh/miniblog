import React, { useEffect, useState } from "react";
import { Container, Postform } from "../Index";
import appwriteService from "../../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";
import { AppwriteException } from "appwrite";

const Editpost = () => {
  const [posts, setposts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService.getPosts(slug).then((post) => {
        if (post) {
          setposts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <div>
      <Container>
        <Postform post={posts}></Postform>
      </Container>
    </div>
  );
};

export default Editpost;
