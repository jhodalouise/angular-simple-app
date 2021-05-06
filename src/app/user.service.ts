import { Injectable } from "@angular/core";
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
    
    getUser(id: number) {
        const user = this.users.find(user => user.id === id);
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
        const id = user.id-1;
        this.users[id] = user;
        this.updatedUserList.next(this.users);
    }

    deleteUser(index: number) {
        const id = index-1;
        this.users.splice(id,1);
        this.updatedUserList.next(this.users);
    }




}