import { Component, OnInit } from '@angular/core';
import { SendService } from '../send.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  userId
  userCars$
  cars: Array<Provider>
  selectedCar: string
  categories
  image: string
  title: string

  selectedCarId: String
  postBody: String
  selectedCategory: String
  selectedSubTitle: String

  constructor(
    private sendService: SendService
  ) { }

  ngOnInit(): void {
    this.sendService.getCategories().subscribe(data => {
      this.categories = data
    })
    if (this.sendService.isAuthenticate()) this.userId = JSON.parse(localStorage.getItem('user'))._id
    const id = {id: this.userId }
    this.sendService.getUsersCars(id).subscribe( data => {
      this.userCars$ = data.cars
    })
  }

  createPost() {
    let indexEnd = this.postBody.indexOf('"></p>')
    if (this.postBody.indexOf('<p><img src') !== 0 ) {
      return
    }

    let postText = this.postBody.slice(indexEnd + 6)
    if (postText.indexOf('<img src') == 0 ) {
      return
    }

    let img = (this.postBody.substring(0, indexEnd)) + '"></p>'

    if (img.includes('img src', 10)) {
      return
    }
    this.image = img

    const post = {
      id: this.selectedCarId,
      title: this.title,
      subTitle: this.selectedSubTitle,
      category: this.selectedCategory,
      car: this.selectedCar,
      img: this.image,
      postbody: postText,
      author: JSON.parse(localStorage.getItem('user')).userName,
      userId: JSON.parse(localStorage.getItem('user'))._id,
      date: Date.now(),
      likes: Number,
      commentsCount: Number
    }

    this.sendService.createPost(post).subscribe(data => {
      if (data.status) {
        this.sendService.alertSuccess(data.msg)
      } else {
        this.sendService.alertError(data.msg)
      }
    })
  }

  compareString() {
    this.cars = this.userCars$
    for (let car of this.cars){
      let str: string = `${car.brand} ${car.model} ${car.generation}`
      if (str === this.selectedCar) {
        this.selectedCarId = car._id
      }
    }
  }
}

interface Provider{
    _id: string
    brand: string
    model: string
    generation: string
    img: string
}
