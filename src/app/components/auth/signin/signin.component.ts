// import {Component, OnDestroy, OnInit} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../services/auth.service';
import {UiService} from '../../../services/ui.service';
import * as fromRoot from '../../../app.reducer';
// import {map} from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
// export class SigninComponent implements OnInit, OnDestroy {
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  // isLoading = false;
  isLoading: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(res => this.isLoading = res);
    this.signinForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    });
  }

  /*ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }*/
}
