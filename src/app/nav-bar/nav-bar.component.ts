import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements DoCheck{

  user? = this._authService.user;

  deconnectUser(){
    this.user = new User();
    this._authService.logout();
    this._router.navigate([`/login`], {});
    alert("Vous êtes déconnecté!!");
  }

  ngDoCheck() {
    this.user= this._authService.user;
  }

  constructor(private _authService: AuthService, private _router : Router){}

}
