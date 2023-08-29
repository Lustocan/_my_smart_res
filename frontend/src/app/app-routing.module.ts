import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/pages/update-profile/update-profile.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { AddTComponent } from './components/pages/tables/add-t/add-t.component';
import { SingleTComponent } from './components/pages/tables/single-t/single-t.component';
import { KitchenComponent } from './components/pages/kitchen/kitchen.component';
import { BarComponent } from './components/pages/bar/bar.component';
import { UsersComponent } from './components/pages/users/users.component';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { MenuKindComponent } from './components/pages/menu/menu-kind/menu-kind.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {path : 'search/:searchTerm', component : HomeComponent},
    {path: '', component : HomeComponent },
    {path : 'login', component : LoginPageComponent},
    {path : 'sign_in', component : SignInPageComponent},
    {path : 'profile', component : UserProfileComponent},
    {path : 'profile/update', component : UpdateProfileComponent},
    {path : 'tables', component : TablesComponent},
    {path : 'add_table', component : AddTComponent},
    {path : 'tables/:number', component : SingleTComponent},
    {path : 'kitchen', component: KitchenComponent},
    {path : 'bar', component: BarComponent},
    {path : 'users', component: UsersComponent},
    {path : 'tables/:number/check-out', component: CheckOutComponent},
    {path : 'menu', component: MenuComponent},
    {path : 'menu/:kind', component: MenuKindComponent},
    {path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
