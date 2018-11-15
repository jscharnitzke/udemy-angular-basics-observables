import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './user/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivationSub: Subscription;

  user1Activated = false;
  user2Activated = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.userActivationSub = this.usersService.userActivated.subscribe(
      (id: number) => {
        this.user1Activated = this.user1Activated || id === 1;
        this.user2Activated = this.user2Activated || id === 2;
      }
    );
  }

  ngOnDestroy() {
    this.userActivationSub.unsubscribe();
  }
}
