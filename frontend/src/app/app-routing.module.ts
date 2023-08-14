import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';

const routes: Routes = [
    {path : 'search/:searchTerm', component : HomeComponent},
    {path: '', component : HomeComponent },
    {path : 'login', component : LoginPageComponent},
    {path : 'sign_in', component : SignInPageComponent},
    {path : 'profile', component : UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
