import config from "../config/config";
import { Client, Account, ID, Databases, Avatars, Storage } from "appwrite";

export class AuthService {
  client = new Client();
  databases;
  avatars;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.avatars = new Avatars(this.client);
  }

  async createAccount({ email, password, name, username }) {
    
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        username
      );
      console.log(userAccount.username)
      if (userAccount) {
        const avatarUrl = this.avatars.getInitials(name);
        await this.saveUserToDB({
          accountId: userAccount.$id,
          name: userAccount.name,
          email: userAccount.email,
          username: userAccount.username,
          imageUrl: avatarUrl,
        });

        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async saveUserToDB({ accountId, email, name, imageUrl, username }) {
    try {
      const newUser = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        ID.unique(),
        {
          accountId,
          email,
          name,
          imageUrl,
          username,
        }
      );
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
      
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
