// import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthService} from '../../../services/auth.service';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// export class HeaderComponent implements OnInit, OnDestroy {
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth = false;
  isAuth: Observable<boolean>;
  authSubscription: Subscription;

  // constructor(private authService: AuthService) { }
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(res => this.isAuth = res);
    this.isAuth = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  /*ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }*/
}
