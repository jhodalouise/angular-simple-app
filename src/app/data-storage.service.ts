import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
        private userService: UserService) {

    }

    // CREATE
    storeUser(user: User) {
        this.http.post<User>('http://localhost:8080/api/add', user)
        .subscribe( user => {
            this.userService.addUser(user);
        });
    }

    // READ
    fetchUsers() {
        console.log("Fetch");
        return this.http.get<User[]>('http://localhost:8080/api/users')
        .pipe(map (users => {
            return users.map(user => {
                return {...user};
            });
        }), tap(users => {
            this.userService.setUsers(users);
        })
        );
    }

    // UPDATE
    updateUser(index: number, updatedUser:User) {
        console.log("updateUser from dataStorage");
        this.http.put<User>('http://localhost:8080/api/update/' + index, updatedUser)
        .subscribe( user => {
            console.log('from updateUser ' + user.name);
            this.userService.updateUser(user);
        
        });
    }

    // DELETE    
    deleteUser(index: number)  {
        this.http.delete('http://localhost:8080/api/delete/' + index)
        .subscribe( data => {
            const localUserToDelete = this.userService.getUsers().find(
                user => user.id === index); 
            const i = this.userService.getUsers().map( user => user.id).indexOf(index);
            this.userService.deleteUser(i);
        }
        );
    }


}