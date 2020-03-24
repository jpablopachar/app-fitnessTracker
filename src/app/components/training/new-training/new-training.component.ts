// import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../../services/training.service';
import {Exercise} from '../../../models/exercise';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
// import {map} from 'rxjs/operators';
import {UiService} from '../../../services/ui.service';
import * as fromTraining from '../../../training.reducer';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
// export class NewTrainingComponent implements OnInit, OnDestroy {
export class NewTrainingComponent implements OnInit {
  // @Output() trainingStart = new EventEmitter<void>();
  // exercises: Exercise[];
  exercises: Observable<Exercise[]>;
  // isLoading = true;
  isLoading: Observable<boolean>;
  // private exerciseSubscription: Subscription;
  // private loadingSubscription: Subscription;

  // constructor(private trainingService: TrainingService, private uiService: UiService) { }
  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    this.exercises = this.store.select(fromTraining.getAvailableExercises);
    /*this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(res => this.isLoading = res);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(res => (this.exercises = res));*/

    this.fetchExercises();
    // this.exercises = this.trainingService.getAvailableExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  /*ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.loadingSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }*/
}
