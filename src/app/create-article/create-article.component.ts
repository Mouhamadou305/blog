import { Component, OnInit } from '@angular/core';
import { ParagraphControlService } from './services/paragraph-control.service';
import { FormGroup } from '@angular/forms';
import { Article } from '../article-unit/model/Article';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Paragraph } from '../article-unit/model/Paragraph';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {

  endpoint : string = "articles/"
  applyForm!: FormGroup;
  numberOfParagraphs : number = 0;
  article!: Article;

  reCreateForm(){
    this.applyForm = this._paragraphControlService.toFormGroup(this.numberOfParagraphs);
  }

  createArticle(){
    if(this.applyForm.valid) {
      let title= this.applyForm.value.title ?? '';
      let description= this.applyForm.value.description ?? '';
      let image= this.applyForm.value.image ?? '';
      let content: Paragraph[] =[];
      for(let i=0; i<this.numberOfParagraphs; i++) {
        let paragraph = new Paragraph();
        paragraph.title = this.applyForm.get("paragraphTitle"+i)?.value;
        paragraph.content = this.applyForm.get("paragraphContent"+i)?.value;
        content.push(paragraph);
      }
      let article : Article = new Article(title, description, content, image, [], this._authService.user.id);
      this._api.add(this.endpoint, article).subscribe(
        () => {
          this._router.navigate([`/articles`], {});
          alert("Article publié avec succès!!!");
        }
      )
    }
  }

  constructor(private _paragraphControlService : ParagraphControlService, private _api : ApiService, private _router : Router, private _authService : AuthService){}

}
