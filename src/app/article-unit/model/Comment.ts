import { User } from "src/app/model/User";
import { Article } from "./Article";

export class Comment{
    id:number;
    userId:number;
    user : User;
    articleId:number;
    commentDate:Date;
    content:string;

    constructor(id : number, userId : number, user : User, articleId : number, commentDate : Date, content : string){
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.articleId = articleId;
        this.commentDate = commentDate;
        this.content = content;
    }

}