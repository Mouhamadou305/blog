import { Component, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  
  passwordVisibility: boolean = false;
  eye: string = "bi bi-eye";
  passwordType = "password";

  endpoint = "users/"
  userId : number = 0;
  user? :User;

  applyForm =  this._formBuilder.group(
    {
      email : [
        "",
        {
          validators : [Validators.required, Validators.email],
        }
      ],
      password : [
        "",
        {
          validators : [Validators.required]
        }
      ]
    },
    {
      validators : [this.createLoginValidator()],
      updateOn : "submit"
    }
  );

  constructor(private _api:ApiService, private _formBuilder: FormBuilder){
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
    this.passwordType = this.passwordVisibility?"text":"password";
    this.eye = this.passwordVisibility?"bi bi-eye-slash":"bi bi-eye";
  }

  getUser(user: User){
    this._api.add(this.endpoint, user).subscribe(
      (data : User) => {
        this.user = data;
      }
    )
  }

  connectUser(){
    this.user.email= this.applyForm.value.email ?? '';
    this.user.password= this.applyForm.value.password ?? '';
    this.user.name= this.applyForm.value.name ?? '';
    this.user.id= Math.ceil(Math.random()*100000);
    this._api.add(this.endpoint, this.user).subscribe(
      (data : User) => {
        this.user = data;
        this._router.navigate([`/login`], {});
        alert("Inscription réussie! Connectez vous!!!");
      }
    )
  }

  createLoginValidator():AsyncValidatorFn{
    return (form : AbstractControl) => {
      const password = form.get('password')?.value;
      const email = form.get('email')?.value;
  
      return this._api.findUserByEmail(this.endpoint, email).pipe(
        map(user => user && user.password==password?null:{login: true})
      )
    }
  }
}
