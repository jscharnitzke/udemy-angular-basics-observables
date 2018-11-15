import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  myNumbersSub: Subscription;
  myObservableSub: Subscription;

  constructor() {}

  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map((number: number) => {
        return number * 2;
      })
    );
    this.myNumbersSub = myNumbers.subscribe((number: number) =>
      console.log(number)
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        observer.complete();
      }, 5000);

      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });

    this.myObservableSub = myObservable.subscribe(
      (data: string) => console.log(data),
      (error: string) => console.error(error),
      () => console.log('completed')
    );
  }

  ngOnDestroy() {
    this.myNumbersSub.unsubscribe();
    this.myObservableSub.unsubscribe();
  }
}
