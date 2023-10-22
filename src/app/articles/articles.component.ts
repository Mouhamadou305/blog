import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Article } from '../article-unit/model/Article';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  
  endpoint : string = "articles"
  articles : Article[] = [];

  constructor(private _api : ApiService){}

  ngOnInit(): void {
      this.getArticles();
  }

  getArticles(){
    this._api.get(this.endpoint).subscribe(
      (data : Article []) => {
        this.articles = data;
      }
    );
  }

}
