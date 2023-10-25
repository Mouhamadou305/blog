import { User } from "src/app/model/User";
import { Article } from "./Article";

export class Comment{
    id:number;
    userId:number;
    user?: User; 
    articleId:number;
    commentDate:number;
    content:string;

    constructor(userId : number, articleId : number, commentDate : number, content : string){
        this.id = Math.ceil(Math.random()*100000);
        this.userId = userId;
        this.articleId = articleId;
        this.commentDate = commentDate;
        this.content = content;
    }

}