import { Component, OnInit } from '@angular/core';
import {Post, SendService} from "../send.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  logos = ['Audi', 'BMW', 'Mercedes-Benz', 'Chevrolet', 'Ford', 'Hyundai', 'Infiniti', 'Lexus', 'Mazda', 'Nissan', 'Toyota', 'Volkswagen']
  categories = ['Отзыв', 'История использования', 'Ремонт', 'Upgrade', 'Реставрация', 'Другое']
  posts: Post[]
  img: Array<string>
  loaded: Boolean = false

  constructor(
    private sendServise: SendService
  ) { }

  ngOnInit(): void {
    this.sendServise.getTopPosts().subscribe( data =>{
        this.posts = data
        this.loaded = true
    })
  }

}
