import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  _id: String,
  aboutUser: String,
  cars: []
  city: String,
  lastName: String,
  name: String,
  userCar: String,
  userName: String,
  ban: Boolean,
  mute: Boolean,
  postsCount: Number,
}

export interface Post {
  author: {
    name: String,
    userId: String
  }
  carId: String,
  category: String,
  comments: []
  commentsCount: Number,
  date: String,
  img: String,
  likes: Number,
  postbody: String,
  updateDate: String,
  title: String,
  _id: String,
  subTitle: String,
  car: String,
  hide: Boolean,
}

export interface Car {
  bodyCar: String,
  brand: String,
  carName: String,
  engineType: String,
  engineVolume: String,
  gearbox: String,
  generation: String,
  img: String,
  model: String,
  postCount: Number,
  subscribersCar: Number,
  text: String,
  user: {
    userId: String,
    name: String
  }
  _id: String,
}

@Injectable({
  providedIn: 'root'
})
export class SendService {
  url = 'https://glacial-woodland-31163.herokuapp.com'
  public dataUpdated$ = new Subject();

  isAuth: boolean
  user: any

  userId
  usersCars$

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }


  alertSuccess(msg) {
    document.getElementById('success').hidden = false
    document.getElementById('success').innerHTML = msg
    setTimeout(() => {
      document.getElementById('success').hidden = true
    }, 3000);
  }

  alertError(msg) {
    document.getElementById('fool').hidden = false
    document.getElementById('fool').innerHTML = msg
    setTimeout(() => {
      document.getElementById('fool').hidden = true
    }, 3000);
  }

    //reg

  registerUser(user): Observable<any> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${this.url}/account/reg`, user);
  }

  sendCity(city): Observable<any> {
    return this.http.post(`${this.url}/account/city`, city)
  }

  addCategory(category): Observable<any> {
    return this.http.post(`${this.url}/account/addCategory`, category)
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.url}/account/getCategories`)
  }

  setUsers(): Observable<any> {
    return this.http.get(`${this.url}/account/users`)
  }

  addCities(): Observable<any> {
    return this.http.get(`${this.url}/account/getCities`)
  }

  updateUser(user): Observable<any> {
    return this.http.post(`${this.url}/account/updateUser`, user)
  }

  getUser(name): Observable<any> {
    return this.http.post(`${this.url}/account/getUser`, name)
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.url}/account/getAllUsers`)
  }

  findOneUser(name): Observable<any> {
    return this.http.post(`${this.url}/account/findOneUser`, name)
  }

  deleteUser(userId): Observable<any> {
    return this.http.post(`${this.url}/account/deleteUser`, userId)
  }

  banUser(userId): Observable<any> {
    return this.http.post(`${this.url}/account/banUser`, userId)
  }

  muteUser(userId): Observable<any> {
    return this.http.post(`${this.url}/account/muteUser`, userId)
  }

  //auth
  authUser(user): Observable<any> {
    return this.http.post(`${this.url}/account/authUser`, user)
  }


  setInStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('auth', 'true')
    localStorage.setItem('likedPosts', JSON.stringify(user.likedPosts))
    this.user = user
  }

  logOut() {
    this.router.navigate(['/auth'])
    localStorage.clear()
    this.usersCars$ = null
  }

  //check
  isAuthenticate() {
    if (localStorage.getItem('user')) return true
  }
  //..endCheck

  //cars
  initial(userId) {
    this.getUsersCars(userId).subscribe(data => {
      this.usersCars$ = data.cars
    })
  }

  addCar(car): Observable<any>{
    return this.http.post(`${this.url}/cars/addCar`, car)
  }

  getAllCars(): Observable<any>{
    return this.http.get(`${this.url}/cars/getAllCars`)
  }

  addCarUser(userCar): Observable<any> {
    return this.http.post(`${this.url}/cars/addUserCar`, userCar)
  }

  getUsersCars(userId): Observable<any> {
    return this.http.post(`${this.url}/cars/getUsersCars`, userId)
  }

  getOneUserCar(idUserCar): Observable<any> {
    return this.http.get(`${this.url}/cars/usercar/${idUserCar}`)
  }

  getOneUserCarProfile(idUserCar): Observable<any> {
    return this.http.get(`${this.url}/cars/usercars/${idUserCar}`)
  }

  deleteUserCar(userCar): Observable<any> {
    return this.http.post(`${this.url}/cars/deleteUserCar`, userCar)
  }

  getCarsByFilter(filter): Observable<any> {
    return this.http.post(`${this.url}/cars/getCarsByFilter`, filter)
  }

  getAllUsersCars(): Observable<any> {
    return this.http.get(`${this.url}/cars/getAllUsersCars`)
  }

  findOneCar(filter): Observable<any> {
    return this.http.post(`${this.url}/cars/findOneCar`, filter)
  }

  //post
  createPost(post): Observable<any> {
    return this.http.post(`${this.url}/posts/createPost`, post)
  }

  getPost(id): Observable<any> {
    return this.http.get(`${this.url}/posts/post/${id}`)
  }

  getPostToUpdate(id): Observable<any> {
    return this.http.get(`${this.url}/posts/update/${id}`)
  }

  updatePost(post): Observable<any> {
    return this.http.post(`${this.url}/posts/updatePost`, post)
  }

  deletePost(postId): Observable<any> {
    return this.http.post(`${this.url}/posts/deletePost`, postId)
  }

  likePost(like): Observable<any> {
    return this.http.post(`${this.url}/posts/likePost`, like)
  }

  addComment(comment): Observable<any> {
    return this.http.post(`${this.url}/posts/addComment`, comment)
  }

  addAnswer(comment): Observable<any> {
    return this.http.post(`${this.url}/posts/addAnswer`, comment)
  }

  getTopPosts(): Observable<any> {
    return this.http.get<Post[]>(`${this.url}/posts/getTopPosts`)
  }

  getByCategory(param): Observable<any> {
    return this.http.post(`${this.url}/posts/getByCategory`, param)
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.url}/posts/getAllPosts`)
  }

  findPost(filter): Observable<any> {
    return this.http.post(`${this.url}/posts/findPost`, filter)
  }

  hidePost(id): Observable<any> {
    return this.http.post(`${this.url}/posts/hidePost`, id)
  }

  getFavoritePosts(ids): Observable<any> {
    return this.http.post(`${this.url}/posts/getFavoritePosts`, ids)
  }

  publicPost(id): Observable<any> {
    return this.http.post(`${this.url}/posts/publicPost`, id)
  }
}
