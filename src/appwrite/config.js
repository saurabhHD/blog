import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, featuredImage, content, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
        return null
    }

    async updatePost(slug, {title, featuredImage, content, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    status
                }
            )
        } catch (error) {
            throw error
        }

        return null
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }

        return null
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
        return null
    }

    async getPosts(query = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            throw error
        }

        return null
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }

        return null
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
        return null
    }

    previewFile(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
      return null
    }
}

const service = new Service()

export default service