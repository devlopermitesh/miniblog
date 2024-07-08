import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

//use default by appwritor
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(),
//     'email@example.com',
//     'password'
// );

//to make a better service for not only depend on appwritor
console.log(config.ProjectId);
export class Authservice {
  client = new Client();
  Account;
  constructor() {
    this.client.setEndpoint(config.appWriteUrl).setProject(config.ProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        //call another funciton for direct log in
        await this.login({ email, password });
        return useraccount;
      } else {
        return useraccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // If error is due to no active session, return null
      if (error.code === 401) {
        return null;
      }
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const currentUser = await this.getCurrentUser();
      if (currentUser) {
        console.log("User is already logged in");
        return currentUser;
      } else {
        return await this.account.createEmailPasswordSession(email, password);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new Authservice();

export default authservice;
