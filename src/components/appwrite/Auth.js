import config from '../../Config/config'
import {Client,Account,ID} from 'appwrite'

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(e){
            console.log(e);
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch(e){
            console.log(e);
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(e){
            console.log(e);
        }
    }
    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch(e){
            console.log(e);
        }
    }
    async getUsername(id){
        try{
            return await this.account.get(id);
        }catch(e){
            console.log(e);
        }
    }
}

const authService = new AuthService();
export default authService