import { Component, OnInit } from '@angular/core';
import {Car, Post, SendService, User} from "../send.service";
import {FormControl, FormGroup} from "@angular/forms";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  form: FormGroup
  users$: Array<User>
  posts$: Array<Post>
  cars$: Array<Car>
  inputValue
  city: String
  category: String

  constructor(
    private sendService: SendService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      brand: new FormControl(''),
      model: new FormControl(''),
      generation: new FormControl(''),
      img: new FormControl('')
    })
  }

  getAllUsers() {
    this.sendService.getAllUsers().subscribe(data => {
      this.users$ = data
      console.log(data)
    })
  }

  getOneUser(event?: any) {
    const inputChar = event.target.value.trim();
    if (inputChar) {
      this.inputValue = inputChar; // получает введенный символ
      console.log(this.inputValue)
      //TODO: why 'name' is object, not just string?
      this.sendService.findOneUser({name: this.inputValue}).pipe(
          take(1)
      ).subscribe(data => {
        this.users$ = data
        console.log(data)
      })
    }

  }

  deleteUser(userId) {
    this.sendService.deleteUser({id: userId}).subscribe(data => {
      this.users$ = data
    })
  }

  banUser(userId, banned) {
    this.sendService.banUser({id: userId, ban: banned}).subscribe(data => {
      console.log(data)
    })
    this.users$.map(user => {
      if (user._id === userId) user.ban = banned
    })
  }

  muteUser(userId, muted) {
    this.sendService.muteUser({id: userId, mute: muted}).subscribe(data => {
      console.log(data)
    })
    this.users$.map(user => {
      if (user._id === userId) user.mute = muted
    })
  }

  getAllPosts() {
    this.sendService.getAllPosts().subscribe(data => {
      this.posts$ = data
      console.log(data)
    })
  }

  getOnePost(event?) {
    if(event.target.value.trim()) {
      this.sendService.findPost({filter: event.target.value.trim()}).subscribe(data => {
        this.posts$ = data
      })
    }
  }

  deletePost(id, carId) {
    const postId = {postId: id, carId}
    this.sendService.deletePost(postId).subscribe(data => {
      console.log(data)
    })
    this.posts$ = this.posts$.filter(post => post._id !== id)
  }

  hidePost(id, isHide) {
    this.sendService.hidePost({id, isHide}).subscribe(data => {
      console.log(data)
    })
    //TODO: may be just use foreach or reduce?
    this.posts$.map(post => {
      if (post._id === id) post.hide = isHide
    })
  }

  getAllUsersCars() {
    this.sendService.getAllUsersCars().subscribe(data => {
      this.cars$ = data
    })
  }

  getOneUserCars(event?) {
    if (event.target.value.trim()){
      this.sendService.findOneCar({filter: event.target.value.trim()}).subscribe(data => {
        this.cars$ = data
      })
    }
  }

  deleteCar(id, user, carName) {
    let userCar = {
      _id: id,
      userId: user,
      carName
    }
    this.sendService.deleteUserCar(userCar).subscribe()
    this.cars$ = this.cars$.filter(car => car._id !== id)
  }

  addCity() {
    if (this.city === undefined) return
    this.sendService.sendCity({city: this.city}).subscribe(data => {
      console.log(`${data.city} добавлен`)
    }, null,() => {
      this.city = undefined
    })
  }

  addCategory() {
    if (this.category === undefined) return
    this.sendService.addCategory({category: this.category}).subscribe(data => {
      console.log(data)
    }, null,() => {
      this.category = undefined
    })
  }

  addCar() {
    const car = {...this.form.value}
    console.log(car)

    this.sendService.addCar(car).subscribe(data => {
      //TODO: wht you log all subs?
      console.log(data)
    })
  }
}
