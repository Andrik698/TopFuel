import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SendService } from './send.service';
import { HttpClientModule }   from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddcarComponent } from './addcar/addcar.component';
import { UsercarComponent } from './usercar/usercar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { MainPageComponent } from './main-page/main-page.component';
import {ImgPipePipe} from "./pipes/img-pipe.pipe";
import {ShortTextPipe} from "./pipes/short-text.pipe";
import { MainPostComponent } from './main-post/main-post.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarsComponent } from './cars/cars.component';
import { ModelsComponent } from './models/models.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { PopupComponent } from './popup/popup.component';
import { AboutComponent } from './about/about.component';
import { RulesComponent } from './rules/rules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    AuthComponent,
    DashboardComponent,
    AddcarComponent,
    UsercarComponent,
    CreatePostComponent,
    PostComponent,
    UpdatePostComponent,
    MainPageComponent,
    ImgPipePipe,
    ShortTextPipe,
    MainPostComponent,
    CategoriesComponent,
    CarsComponent,
    ModelsComponent,
    UserComponent,
    AdminComponent,
    FooterComponent,
    FavoriteComponent,
    PopupComponent,
    AboutComponent,
    RulesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
