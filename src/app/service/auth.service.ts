import { Injectable } from '@angular/core';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  user : User = new User();
  private token: string | null = null;

  login(token: string) {
    this.token = token;
  }

  logout() {
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }
}
