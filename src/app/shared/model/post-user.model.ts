import { User } from "./user.model";

export interface PostUserModel{
    id:string;
    userId:string;
    content:string;
    user:User;
}