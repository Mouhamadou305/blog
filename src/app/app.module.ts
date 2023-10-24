import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api/api.service';
import { ArticlesComponent } from './articles/articles.component';
import { ConnectionComponent } from './connection/connection.component';
import { ArticleUnitComponent } from './article-unit/article-unit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './connection/interceptor/token.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ConnectionComponent,
    ArticleUnitComponent,
    RegistrationComponent,
    NavBarComponent
    
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
