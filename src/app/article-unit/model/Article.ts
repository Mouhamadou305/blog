import { Paragraph } from "./Paragraph";

export class Article {
    id : number;
    title : string;
    description : string;
    content : Paragraph[];
    image : string;
    likes : number[]; //contains the identifiers of the users that liked the article

    constructor(title : string, description : string, content : Paragraph[], image : string, likes : number[]) {
        this.id =  Math.ceil(Math.random()*100000);
        this.title = title;
        this.description = description;
        this.content = content;
        this.image = image;
        this.likes = likes;
    }
}