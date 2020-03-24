// import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
// export class SidenavListComponent implements OnInit, OnDestroy {
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  // isAuth = false;
  isAuth: Observable<boolean>;
  authSubscription: Subscription;

  // constructor(private authService: AuthService) { }
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(res => this.isAuth = res);
    this.isAuth = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  /*ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }*/
}
