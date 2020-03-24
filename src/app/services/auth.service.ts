import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
// import {User} from '../models/user';
import {AuthData} from '../models/auth-data';
// import {Subject} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import {TrainingService} from './training.service';
import {UiService} from './ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../ui.actions';
import * as Auth from '../auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*authChange = new Subject<boolean>();
  private isAuthenticated = false;*/

  constructor(private router: Router, private auth: AngularFireAuth, private trainingService: TrainingService, private snackbar: MatSnackBar, private uiService: UiService, private store: Store<fromRoot.State>) { }

  initAuthListener() {
    this.auth.authState.subscribe(res => {
      if (res) {
        /*this.isAuthenticated = true;
        this.authChange.next(true);*/
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/signin']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(res => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch((err) => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.auth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch((err) => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(err.message, null, 3000);
    });
  }

  logout() {
    this.auth.auth.signOut();
  }

  /*isAuth() {
    return this.isAuthenticated;
  }*/
}
