import { Paragraph } from "./Paragraph";

export class Article {
    id : number;
    title : string;
    description : string;
    content : Paragraph[];
    image : string;
    likes : number[]; //contains the identifiers of the users that liked the article

    static index : number = 0;

    constructor(title : string, description : string, content : Paragraph[], image : string, likes : number[]) {
        Article.index = Article.index + 1;
        this.id = Article.index;
        this.title = title;
        this.description = description;
        this.content = content;
        this.image = image;
        this.likes = likes;
    }
}