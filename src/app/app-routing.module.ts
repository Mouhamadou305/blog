import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ConnectionComponent } from './connection/connection.component';
import { ArticleUnitComponent } from './article-unit/article-unit.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', component: ArticlesComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'login', component: ConnectionComponent},
  {path: 'articles/:id', component: ArticleUnitComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
