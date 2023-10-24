import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from '../model/User';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  
  passwordVisibility: boolean = false;
  eye: string = "bi bi-eye";
  passwordType = "password";
  message : string = "";

  endpoint = "users/"
  userId : number = 0;
  user :User = new User();

  applyForm =  this._formBuilder.group(
    {
      email : [
        "",
        {
          validators : [Validators.required, Validators.email],
          updateOn : "change"
        }
      ],
      password : [
        "",
        {
          validators : [Validators.required],
          updateOn : "change"
        }
      ]
    }
    // {
    //   asyncValidators : [this.createLoginValidator()],
    //   updateOn : "submit"
    // }
  );

  constructor(private _api: ApiService, private _formBuilder: FormBuilder, private _router: Router, private _authService: AuthService){
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
    this.passwordType = this.passwordVisibility?"text":"password";
    this.eye = this.passwordVisibility?"bi bi-eye-slash":"bi bi-eye";
  }

  connectUser(){
    if(this.applyForm.valid) {
      this.user.email= this.applyForm.value.email ?? '';
      this.user.password= this.applyForm.value.password ?? '';
      this._api.findUserByEmail(this.endpoint, this.user.email).subscribe(
        (data : User[]) => {
          if (data[0].password == this.user.password) {
            console.log(data[0])
            this._authService.user.email= data[0].email;
            this._authService.user.id= data[0].id;
            this._authService.user.name= data[0].name;
            this.user= new User();
            this._authService.login("1234567891011121314151617181920212223242526272829");
            this._router.navigate([`/articles`], {});
            alert("Connexion réussie!!");
          } else{
            this.message = "Adresse email ou mot de passe incorrect";
          }
        }
      );
    }
  }

  // createLoginValidator():AsyncValidatorFn{
  //   return (form : AbstractControl) => {
  //     const password = form.get('password')?.value;
  //     const email = form.get('email')?.value;

  //     return this._api.findUserByEmail(this.endpoint, email).pipe(
  //       map(user => (user && user.length!=0 && user[0].password==password)?null:{loginError: true})
  //     )
  //   }
  // }

}
