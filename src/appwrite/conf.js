import config from "../conf/config";
import { Databases, Client, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.ProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featureImage, status, user_id }) {
    try {
      console.log(this.database);
      return await this.database.createDocument(
        config.database_id,
        config.collection_id,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          user_id,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.database.updateDocument(
        config.database_id,
        config.collection_id,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.database_id,
        config.collection_id,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);

      return false;
    }
  }
  async getDocument(slug) {
    try {
      return await this.database.getDocument(
        config.database_id,
        config.collection_id,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.database_id,
        config.collection_id,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }
  //file upload service
  async uploadFile(file) {
    try {
      const createfile = await this.bucket.createFile(
        config.bucket_id,
        ID.unique(),
        file
      );
      console.log("createfile" + createfile);
      return createfile;
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appWriteUrl, fileId);
    } catch (error) {
      throw error;
    }
  }
  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview(config.appWriteUrl, fileId);
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();
export default service;
