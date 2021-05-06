import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "./data-storage.service";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class UsersResolverService implements Resolve<User[]> {


    constructor(private dataStorage: DataStorageService
        , private userService: UserService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<User[]> | Promise<User[]> | User[] {

        console.log('From Resolver');
        const users = this.userService.getUsers();
        if (users.length === 0) {
            return this.dataStorage.fetchUsers();
        } else {
            return users;
        }
    }
}