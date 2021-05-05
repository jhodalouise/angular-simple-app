import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UsersResolverService } from "./users-resolver.service";

import { UserListComponent } from "./users/user-list/user-list.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    { path: 'update/:id', component: UserListComponent,
    resolve:  { users: UsersResolverService}},
    { 
        path: 'users', component: UsersComponent, 
        children: [
        {
        path: '', 
        component: UserListComponent,
    },
        {path: ':id', component: UserDetailComponent},
        ]
        
    },
    { path: 'page-not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: '/page-not-found'}
    
]


// const appRoutes: Routes = [
//     { path: '', redirectTo: '/users', pathMatch: 'full'},
//     { path: 'update/:id', component: UserListComponent, resolve: [UsersResolverService]},
//     { 
//         path: 'users', component: UsersComponent, 
//         children: [
//         {path: '', component: UserListComponent},
//         {path: ':id', component: UserDetailComponent},
//         ],
//         resolve:  { users: UsersResolverService}
//     },
//     { path: 'page-not-found', component: PageNotFoundComponent},
//     { path: '**', redirectTo: '/page-not-found'}
    
// ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
    providers: [UsersResolverService]
})
export class AppRoutingModule {

}