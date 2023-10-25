import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {
  user : User = sessionStorage.getItem("bestblogUser")?JSON.parse(sessionStorage.getItem("bestblogUser") ?? ""):(new User());
  private token: string | null = null;

  login(user : User, token: string) {
    this.token = token;
    this.user = user;
    sessionStorage.setItem('bestblogToken', this.token);
    sessionStorage.setItem('bestblogUser', JSON.stringify(this.user))
  }

  logout() {
    this.token = null;
    this.user = new User();
    sessionStorage.removeItem('bestblogToken');
    sessionStorage.removeItem('bestblogUser');
  }

  getToken(): string | null {
    let tok = this.token? this.token : sessionStorage.getItem('bestblogToken');
    return tok;
  }
}
