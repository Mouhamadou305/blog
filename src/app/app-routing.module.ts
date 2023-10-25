import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ConnectionComponent } from './connection/connection.component';
import { ArticleUnitComponent } from './article-unit/article-unit.component';
import { RegistrationComponent } from './registration/registration.component';
import { unauthGuard } from './connection/unauth-guard/unauth.guard';
import { authGuard } from './connection/auth-guard/auth.guard';
import { roleGuard } from './connection/role-guard/role.guard';
import { CreateArticleComponent } from './create-article/create-article.component';

const routes: Routes = [
  {path: '', component: ArticlesComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'createArticle', component: CreateArticleComponent, canActivate: [authGuard, roleGuard]},
  {path: 'login', component: ConnectionComponent, canActivate: [unauthGuard]},
  {path: 'articles/:id', component: ArticleUnitComponent, canActivate: [authGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [unauthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
