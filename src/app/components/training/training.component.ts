// import {Component, OnDestroy, OnInit} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
// import {Observable, Subscription} from 'rxjs';
import {Observable} from 'rxjs';
import {TrainingService} from '../../services/training.service';
import * as fromTraining from '../../training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
// export class TrainingComponent implements OnInit, OnDestroy {
export class TrainingComponent implements OnInit {
  // ongoingTraining = false;
  ongoingTraining: Observable<boolean>;
  // exerciseSubscription: Subscription;

  // constructor(private trainingService: TrainingService) { }
  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining = this.store.select(fromTraining.getIsTraining);
    /*this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(res => {
      if (res) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });*/
  }

  /*ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }*/
}
