const config = {
  appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  ProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  bucket_id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
