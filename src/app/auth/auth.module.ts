import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailAddressComponent } from './verify-email-address/verify-email-address.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"verify-email-address",component:VerifyEmailAddressComponent}
]

@NgModule({
  declarations: [
  
      RegisterComponent,
       LoginComponent,
       ForgotPasswordComponent,
       VerifyEmailAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
    
  ]
})
export class AuthModule { }
