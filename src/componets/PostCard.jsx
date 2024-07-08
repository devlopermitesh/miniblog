import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featureImage }) => {
  // Construct the URL for the feature image
  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/66891f23001173fc9b0d/files/${featureImage}/view?project=66891c01002b2fb6d1e5&mode=admin`;

  return (
    <Link to={`post/${$id}`}>
      <div className="'w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={imageUrl} alt={title} className="rounded-xl" />
          <h2 className="text-black">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
