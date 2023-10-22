import { Component, inject } from '@angular/core';
import { Article } from './model/Article';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './model/Comment';
import { User } from '../model/User';

@Component({
  selector: 'article-unit',
  templateUrl: './article-unit.component.html',
  styleUrls: ['./article-unit.component.css']
})
export class ArticleUnitComponent {

  article? : Article;
  endpoint : string = "articles/";
  articleId : number = 0;
  comments : Comment[]=[];
  user? : User;

  constructor(private _api : ApiService, public route: ActivatedRoute){
    this.articleId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
      this.getArticle();
      this.getCommentsByArticleId();
  }

  getArticle(){
    this._api.get(this.endpoint+this.articleId).subscribe(
      (data : Article) => {
        this.article = data;
      }
    );
  }

  //ATTENTION
  like(){
    if(this.article?.likes.includes(1)){
      this.article.likes.splice(this.article.likes.indexOf(1), 1);
    }else{
      this.article?.likes.push(1);
    }
  }

  getCommentsByArticleId() {
    this._api.get(`comments?articleId=${this.articleId}`).subscribe(
      (data: Comment[])=>{
        this.comments=data;
        for(let i=0; i<this.comments.length;i++) {
          this._api.get("users/"+data[i].userId).subscribe(
            (userData: User)=>{
              data[i].user = userData;
            }
          )
        }
      }
    )
  }

}
