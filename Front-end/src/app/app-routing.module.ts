import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard'
import { AddcarComponent } from './addcar/addcar.component';
import { UsercarComponent } from './usercar/usercar.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {MainPostComponent} from "./main-post/main-post.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ModelsComponent} from "./models/models.component";
import {CarsComponent} from "./cars/cars.component";
import {UserComponent} from "./user/user.component";
import {AdminComponent} from "./admin/admin.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {RulesComponent} from "./rules/rules.component";
import {AboutComponent} from "./about/about.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: 'reg', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'addcar', component: AddcarComponent, canActivate: [AuthGuard]},
  {path: 'usercar/:id', component: UsercarComponent, canActivate: [AuthGuard]},
  {path: 'createpost', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'update/:id', component: UpdatePostComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: '', component: MainPageComponent},
  {path: 'main-post/:id', component: MainPostComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'car/:id', component: CarsComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'rules', component: RulesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
