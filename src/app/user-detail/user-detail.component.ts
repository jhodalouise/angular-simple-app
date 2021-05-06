import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  selectedUser : User;
  id: number;
  paramsSubscription: Subscription;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']-1;
    this.paramsSubscription = this.dataStorage.fetchUsers().subscribe();
    this.userService.updatedUserList
    .subscribe(
      (users: User[]) => {
        if (users.length === 0) {
          this.router.navigate(['users']);
        }
        if (this.id >=  users.length || this.id < 0 || isNaN(this.id)) {
          this.router.navigate(['**']);
        }
        this.selectedUser = users[this.id];
      });
  }

  onBackButton() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
