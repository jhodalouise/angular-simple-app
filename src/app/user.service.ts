import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "./data-storage.service";

import { User } from "./user.model";

@Injectable({providedIn: 'root'})
export class UserService {

    // constructor(private dataStorage: DataStorageService) {}


    updatedUserList = new Subject<User[]>();

    
    // private  users: User[] = [
    //     new User('Jhoda', 'jhodalouise@gmail.com', '2345566'),
    //     new User('Gavin', 'gavin@gmail.com', '898978'),
    //     new User('Zian', 'zian@gmail.com', '344667'),
    //     new User('Maria', 'maria@gmail.com', '908978376')
    //   ];

    private  users: User[] = [];
    index = new Subject<User["index"]>();


    getUsers() {
        return this.users;
        // this.updatedUserList.next(this.users);
    }
    
    getUser(indexfromLocalArray: number) {
        const user = this.users[indexfromLocalArray];
        console.log("user is below: ");
        console.log(user);
        return user;
    }

    getId(id: number) {
        const user = this.users[id];
        return user;
    }

    getIndex(id: number) {
        const user = this.users.find(user => user.id === id);
        const index = user?.index;
        console.log('cccccc')
        this.index.next(index);
    }

    addUser(user: User) {
        this.users.push(user);
        // this.updatedUserList.next(this.getUsers());
        this.updatedUserList.next(this.users);
    }

    setUsers(users: User[]) {
        console.log('setUsers is called');
        this.users = users;
        // this.updatedUserList.next(this.getUsers());
        this.updatedUserList.next(this.users);
    }

    updateUser(user: User) {
        // get the id from API
        const id = user.id;
        // get the index using the id
        const index = this.users.map( user => user.id).indexOf(id);
        this.users[index] = user;
        this.updatedUserList.next(this.users);
    }

    deleteUser(index: number) {
        // const id = index-1;
        // this.users.splice(id,1);
        this.users.splice(index,1);
        this.updatedUserList.next(this.users);
    }




}