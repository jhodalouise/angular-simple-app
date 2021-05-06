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
  // @Input() user: User;

  userSub: Subscription;
  public users: User[] = [];



  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService) {}




  ngOnInit(): void {
    // this.dataStorage.fetchUsers();
    // console.log(this.userService.getUsers());
    console.log('lalalalalalala');
    // this.dataStorage.fetchUsers().subscribe();
    this.userSub = this.userService.updatedUserList
    .subscribe(
      (users: User[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  onUserSelected(id: number) {
    const paramId = id+1;
    // if (this.route.snapshot.params['id']) {
    //   this.router.navigate(['..'], {relativeTo: this.route});
    // }
    this.router.navigate([paramId], {relativeTo: this.route});
  }

  onUpdateUser(index: number) {
    this.router.navigate(['update', index+1]);
  }

  // openModal(index: number) {
  //   let modal = document.getElementById("modalId");
  //   let span = document.getElementsByClassName("exit")[0];
  //   modal.style.display = "flex";
  //   span.addEventListener('click', function() {
  //     modal.style.display = "none";
  //   });
  // }



  // onUserDelete(index: number) {
  //   const user = this.users[index];
  //   console.log(user);
  //   const id = user.id;
  //   this.dataStorage.deleteUser(id);

    // this.router.navigate([this.router.url]);

    // history.go(0);
    // this.router.navigate(['users']);
    // this.route.data.subscribe((
    //   data: {
    //     users: User[]}) => {
    //       console.log('Heeeeey called here');
    //       this.users = data.users;
    //     }
    // );

  //   this.router.navigate(['users']);

  // }

   onUserDelete(index: number) {
    const user = this.users[index];
    console.log(user);
    const id = user.id;
    this.dataStorage.deleteUser(id);
    this.router.navigate(['users']);
  }
  




}
