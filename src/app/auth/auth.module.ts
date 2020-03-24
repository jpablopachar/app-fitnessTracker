import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from '../components/auth/signup/signup.component';
import {SigninComponent} from '../components/auth/signin/signin.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from '../components/auth/auth-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
