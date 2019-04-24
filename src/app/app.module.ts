//Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { AddBookComponent } from './profile/user-library/add-book/add-book.component';
import { BookItemComponent } from './profile/user-library/book-item/book-item.component';
//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FindBookComponent } from './map/find-book/find-book.component';
import { HeaderComponent } from './header/header.component';
//Services
import { BookService } from './profile/user-library/book-services/books.service';
import { UserService } from './profile/user-services/user.service';
import { MapService } from './map/map-services/map.service';
//Misc
import { environment } from '../environments/environment';
import Axios from 'axios';
import { TestBookItemComponent } from './test-book-item/test-book-item.component';
import { HomePageComponent } from './home-page/home-page.component';

Axios.defaults.baseURL = 'https://afu8lhb2z7.execute-api.us-east-1.amazonaws.com/dev/';
Axios.defaults.headers.common['Authorization'] = "bearer " + localStorage.getItem('bToken');
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    ProfileComponent,
    AddBookComponent,
    BookItemComponent,
    FindBookComponent,
    HeaderComponent,
    TestBookItemComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY
    })
  ],
  exports: [
    BookItemComponent
  ],
  providers: [
    BookService,
    UserService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
