import { Component, OnInit } from '@angular/core';
import {Car, SendService, User} from "../send.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  cars$: Array<Car>
  user$: User
  posts$
  loaded: Boolean = false
  postLoaded: Boolean = false
  activeBtn: Boolean = true


  constructor(
    private sendService: SendService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.sendService.getUser({userName: params.id}).subscribe( data => {
        this.cars$ = data.cars
        this.user$ = data.user
        this.loaded = true
        console.log(data)
      })
    })


  }

  loadPost(carId) {
    this.activeBtn = false
      this.sendService.getOneUserCar(carId).subscribe(data => {
        this.posts$ = data.post
        this.postLoaded = true
        this.activeBtn = true
      })
  }

}
