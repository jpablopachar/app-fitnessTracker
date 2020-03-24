import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WellcomeComponent} from './components/wellcome/wellcome.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', component: WellcomeComponent},
  {path: 'training', loadChildren: () => import('./training/training.module').then(m => m.TrainingModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
