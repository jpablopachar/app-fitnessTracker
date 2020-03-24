import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {Exercise} from '../models/exercise';
// import {Subject, Subscription} from 'rxjs';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UiService} from './ui.service';
import { take } from 'rxjs/operators';
import * as Training from '../training.actions';
import * as UI from '../ui.actions';
import * as fromTraining from '../training.reducer';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  /*exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private finishedExercises: Exercise[] = [];*/
  private fbSubs: Subscription[] = [];

  // constructor(private db: AngularFirestore, private uiService: UiService) {}
  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(map(docArray => {
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          date: doc.payload.doc.data().date,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
        };
      });
    })).subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvailableTrainigs(exercises));
      /*this.uiService.loadingStateChanged.next(false);
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises]);*/
    }, (err) => {
      this.store.dispatch(new UI.StopLoading());
      // this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
      // this.exercisesChanged.next(null);
    }));
  }

  startExercise(idSelected: string) {
    /*this.runningExercise = this.availableExercises.find(exercise => exercise.id === idSelected);

    this.exerciseChanged.next({ ...this.runningExercise });*/
    this.store.dispatch(new Training.StartTraining(idSelected));
  }

  completeExercise() {
    /*this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    /!*this.runningExercise = null;
    this.exerciseChanged.next(null);*!/
    this.store.dispatch(new Training.StopTraining());*/
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed',
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    /*this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });*/
    /*this.runningExercise = null;
    this.exerciseChanged.next(null);*/
    // this.store.dispatch(new Training.StopTraining());
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  /*getRunningExercise() {
    return { ...this.runningExercise };
  }*/

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // this.finishedExercisesChanged.next(exercises);
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
