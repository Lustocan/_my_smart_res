import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/partials/search/search.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { UpdateProfileComponent } from './components/pages/update-profile/update-profile.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { AddTComponent } from './components/pages/tables/add-t/add-t.component';


const config : SocketIoConfig = {
      url : "https://localhost:443" ,
      options : {
          transports : ['websocket']
      }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    LoginPageComponent,
    SignInPageComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    TablesComponent,
    AddTComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
    ToastrModule.forRoot({
        timeOut : 2000,
        positionClass : 'toast-top-left',
        newestOnTop: false
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
