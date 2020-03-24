import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {StoreModule} from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import {AuthService} from './services/auth.service';
import {TrainingService} from './services/training.service';
import { environment } from '../environments/environment';
import {UiService} from './services/ui.service';
import { AuthModule } from './auth/auth.module';
import {reducers} from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WellcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
