import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage.service';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  fetchSub: Subscription;
  public users: User[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService) {}

  ngOnInit(): void {
    this.fetchSub = this.dataStorage.fetchUsers().subscribe();
    this.userSub = this.userService.updatedUserList
    .subscribe(
      (users: User[]) => {
        this.users = users;
      });
     this.users = this.userService.getUsers(); 
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.fetchSub.unsubscribe();
  }


  onUserSelected(id: number) {
    const paramId = id+1;
    this.router.navigate([paramId], {relativeTo: this.route});
  }

  onUpdateUser(index: number) {
    this.userService.userToUpdate.next(index);
    this.router.navigate(['update', index+1]);
  }

   onUserDelete(index: number) {
    const user = this.userService.getUser(index);
    const id = user.id;
    this.dataStorage.deleteUser(id);
    this.router.navigate(['users']);


  }
  




}
