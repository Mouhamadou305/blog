import { Component } from '@angular/core';
import { User } from '../model/User';
import { ApiService } from '../api/api.service';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  endpoint :string = "users/"
  user: User= new User();

  passwordVisibility: boolean = false;
  eye: string = "bi bi-eye";
  passwordType = "password";

  confirmationVisibility: boolean = false;
  confirmationEye: string = "bi bi-eye";
  confirmationPasswordType = "password";

  applyForm =  this._formBuilder.group(
    {
      email : [
        "",
        {
          validators : [Validators.required, Validators.email],
          asyncValidators : [this.createUniqueEmailValidator(this.user)]
        }
      ],
      name : [
        "",
        {
          validators : [Validators.required]
        }
      ],
      password : [
        "",
        {
          validators : [Validators.required]
        }
      ],
      confirmation : [
        "",
        {
          validators : [Validators.required]
        }
      ]
    },
    {
      validators : [this.createPasswordConfirmationValidator()]
    }
  );

  constructor(private _api: ApiService, private _router : Router, private _formBuilder : FormBuilder){}

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
    this.passwordType = this.passwordVisibility?"text":"password";
    this.eye = this.passwordVisibility?"bi bi-eye-slash":"bi bi-eye";
  }

  changeConfirmationVisibility(){
    this.confirmationVisibility = !this.confirmationVisibility;
    this.confirmationPasswordType = this.confirmationVisibility?"text":"password";
    this.confirmationEye = this.confirmationVisibility?"bi bi-eye-slash":"bi bi-eye";
  }

  createUser(){
    if(this.applyForm.valid) {
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
  }

  createPasswordConfirmationValidator():ValidatorFn{
    return (form : AbstractControl) : ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmation')?.value;
  
      if (password === confirmPassword) {
        return null;
      } else {
        return { mismatch: true };
      }
    }
  }

  createUniqueEmailValidator(user : User):AsyncValidatorFn{
    return (control: AbstractControl) => {
      return this._api.findUserByEmail(this.endpoint, control.value).pipe(
              map(user => user && user.length!=0 ? {userExists:user} : null)
          );
    }
  }

}
