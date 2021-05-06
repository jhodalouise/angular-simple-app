import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage.service';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  userSub: Subscription;
  fetchSub: Subscription;
  selectedUser: User;
  isEditMode = false;
  id: number;
  index: number;

  indexToListen: Subscription;


  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private router: Router) { }




  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id']-1;
    this.fetchSub = this.dataStorage.fetchUsers().subscribe();
    this.userSub = this.userService.updatedUserList
    .subscribe(
      (users: User[]) => {
        if (this.id >= 0) {
          this.isEditMode = true;
        }
        this.selectedUser = users[this.id];
        this.index = this.selectedUser?.id;
        this.form.form.patchValue({
          name: this.selectedUser?.name,
          email: this.selectedUser?.email,
          contact: this.selectedUser?.contact
      });
      });
    this.indexToListen = this.userService.userToUpdate
    .subscribe(
      (id: number) => {
        if (this.id >= 0) {
          this.isEditMode = true;
        }
        const users = this.userService.getUsers();
        this.selectedUser = users[id];
        this.index = this.selectedUser?.id;
        this.form.form.patchValue({
          name: this.selectedUser?.name,
          email: this.selectedUser?.email,
          contact: this.selectedUser?.contact
      });
      }
    );
  }




  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const contact = form.value.contact;
    if (this.isEditMode) {
      this.dataStorage.updateUser(this.index, {name,email,contact});
      this.isEditMode = false;
    } else {
      const newUser = new User(name,email,contact);
      this.dataStorage.storeUser(newUser);
    }
    form.reset();
    this.router.navigate(['users']);
  }

  ngOnDestroy() {
    this.fetchSub.unsubscribe();
    this.userSub.unsubscribe();
    this.indexToListen.unsubscribe();
  }

}
