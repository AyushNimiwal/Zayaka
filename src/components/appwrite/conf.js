import config from '../../Config/config'
import {Client,ID,Databases,Storage,Query} from 'appwrite'
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({recipename,time,description,ingredients,instructions,category,featuredImages,userid}){
        try{
            const response=await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    recipename,
                    time,
                    description,
                    ingredients,
                    instructions,
                    category,
                    featuredImages,
                    userid
                }
            );
            return response;
        }catch(e){
            console.log(e);
        }
    }
    async updatePost(id,{recipename,time,description,ingredients,instructions,category,featuredImages}){
        try{
            const response=await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id,
                {
                    recipename,
                    time,
                    description,
                    ingredients,
                    instructions,
                    category,
                    featuredImages
                }
            );
            return response;
        }catch(e){
            console.log(e);
        }
    }
    async deletePost(id){
        try{
            const response=await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            );
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }
    async getPost(id){
        try{
            const response=await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                id
            );
            return response;
        }catch(e){
            console.log(e);
        }
    }
    async getPosts(){
        try{
            const response=await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
            );
             return response.documents;
        }catch(e){
            console.log(e);
        }
    }
    async getPostsByUser(userid){
        try{
            const response=await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
            );
            return response.documents.filter((post)=>post.userid==userid);
        }catch(e){
            console.log(e);
        }
    }
    async uploadImage(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            );
        }catch(e){
            console.log(e);
        }
    }
    async deleteImage(id){
        try{
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                id,
            );
        }catch(e){
            console.log(e);
        }
    }
    async getImage(id){
        try{
            return await this.bucket.getFileView(
                config.appwriteBucketId,
                id,
            );
        }catch(e){
            console.log(e);
        }
    }
    async getCategory(){
        try{
            const category=[];
            const response=await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
            );
            response.documents.map((post)=>{
                post.category.map((cat)=>{
                    if(!category.includes(cat)){
                        category.push(cat);
                    }
                });
            });
            return category;
        }
        catch(e){
            console.log(e);
        }
    }
}   

const service=new Service();
export default service