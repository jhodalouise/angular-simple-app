import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";

import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class UserService {

 
    updatedUserList = new Subject<User[]>();


    private  users: User[] = [];
    index = new Subject<User["index"]>();


    getUsers() {
        return this.users;
    }
    
    getUser(indexfromLocalArray: number) {
        const user = this.users[indexfromLocalArray];
        return user;
    }

    addUser(user: User) {
        this.users.push(user);
        this.updatedUserList.next(this.users);
    }

    setUsers(users: User[]) {
        this.users = users;
        this.updatedUserList.next(this.users);
    }

    updateUser(user: User) {
        const id = user.id;
        const index = this.users.map( user => user.id).indexOf(id);
        this.users[index] = user;
        this.updatedUserList.next(this.users);
    }

    deleteUser(index: number) {
        this.users.splice(index,1);
        this.updatedUserList.next(this.users);
    }




}