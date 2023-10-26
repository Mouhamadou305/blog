import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from '../model/User';
import { FormBuilder, Validators } from '@angular/forms';
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
      this._api.findUserByEmail(this.endpoint, this.applyForm.value.email ?? "").subscribe(
        (data : User[]) => {
          if(data.length==0){
            this.message = "Adresse email ou mot de passe incorrect";
          }
          if (data[0].password == this.applyForm.value.password) {
            this._authService.login(data[0], "1234567891011121314151617181920212223242526272829");
            this._router.navigate([`/articles`], {});
            alert("Connexion réussie!!");
          } else{
            this.message = "Adresse email ou mot de passe incorrect";
          }
        }
      );
    }
  }

  prevent(event : any){
    event.preventDefault();
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
