import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { UsersResolverService } from "./users-resolver.service";
import { UserListComponent } from "./user-list/user-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    { path: 'users', component: UserListComponent, resolve:  { users: UsersResolverService}},
    {path: 'users/:id', component: UserDetailComponent},
    { path: 'update/:id', component: UserListComponent, 
    resolve:  { users: UsersResolverService}},
    { path: 'update/:id/:id', redirectTo: '/users/:id'},
    { path: 'page-not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: '/page-not-found'}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
    providers: [UsersResolverService]
})
export class AppRoutingModule {

}