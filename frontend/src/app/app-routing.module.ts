import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/pages/update-profile/update-profile.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { AddTComponent } from './components/pages/tables/add-t/add-t.component';
import { UpdTComponent } from './components/pages/tables/upd-t/upd-t.component';

const routes: Routes = [
    {path : 'search/:searchTerm', component : HomeComponent},
    {path: '', component : HomeComponent },
    {path : 'login', component : LoginPageComponent},
    {path : 'sign_in', component : SignInPageComponent},
    {path : 'profile', component : UserProfileComponent},
    {path : 'profile/update', component : UpdateProfileComponent},
    {path : 'tables', component : TablesComponent},
    {path : 'add_table', component : AddTComponent},
    {path : 'tables/:id/update', component : UpdTComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
