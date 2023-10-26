import { Component, OnInit } from '@angular/core';
import { Article } from './model/Article';
import { ApiService } from '../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from './model/Comment';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'article-unit',
  templateUrl: './article-unit.component.html',
  styleUrls: ['./article-unit.component.css']
})
export class ArticleUnitComponent implements OnInit {

  article : Article = new Article("", "", [], "", [], 0);
  endpoint : string = "articles/";
  articleId : number = 0;
  comments : Comment[]=[];
  user? : User;
  heartColor? : string;

  commentErrorMessage = "";

  constructor(private _api : ApiService, public route: ActivatedRoute, private _authService : AuthService, private _formBuilder : FormBuilder, private _router : Router){
    this.articleId = Number(this.route.snapshot.params['id']);
    this.getArticle();
    this.getCommentsByArticleId();
    this.user = this._authService.user;
  }

  ngOnInit(): void {
      this.getArticle();
      this.getCommentsByArticleId();
      this.user = this._authService.user;
  }

  applyForm =  this._formBuilder.group(
    {
      comment : [
        "",
        {
          validators : [Validators.required],
          updateOn : "change"
        }
      ]
    }
  )

  getArticle(){
    this._api.get(this.endpoint+this.articleId).subscribe(
      (data : Article) => {
        this.article = data;
        let id = this._authService.user.id;
        if(this.article?.likes.includes(id)){
          this.heartColor = "red";
        }else{
          this.heartColor = "gray";
        }
        this._api.get("users/"+this.article.idEditor).subscribe(
          (data : User) => {this.article.user= data;}
        );
      }
    );
  }

  like(){
    let id = this._authService.user.id;
    if(this.article?.likes.includes(id)){
      this.article.likes.splice(this.article.likes.indexOf(id), 1);
      this._api.patch(this.endpoint, this.article.id, {likes : this.article.likes}).subscribe();
      this.heartColor = "gray";
    }else{
      this.article?.likes.push(id);
      this._api.patch(this.endpoint, this.article.id, {likes : this.article.likes}).subscribe();
      this.heartColor = "red";
    }
  }

  comment(){
    let id = this._authService.user.id;
    if(this.applyForm.get("comment")?.value?.trim()!=""){
      this.commentErrorMessage = "";
      let comment : Comment = new Comment(id, this.article.id, Date.now(), this.applyForm.get("comment")?.value ?? "");
      this._api.add("comments", comment).subscribe();
      this._api.get("users/"+id).subscribe(
        (userData: User)=>{
          comment.user = userData;
        }
      )
      this.comments.push(comment);
      
    }else{
      this.commentErrorMessage = "Entrez d'abord votre commentaire.";
    }
  }

  getCommentsByArticleId() {
    this._api.get(`comments?articleId=${this.articleId}`).subscribe(
      (data: Comment[])=>{
        this.comments=data;
        for(let i=0; i<this.comments.length;i++) {
          this._api.get("users/"+data[i].userId).subscribe(
            (userData: User)=>{
              this.comments[i].user = userData;
            }
          )
        }
      }
    )
  }

}
