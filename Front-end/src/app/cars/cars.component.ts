import { Component, OnInit } from '@angular/core';
import {Car, Post, SendService} from "../send.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  thisCar: Car
  posts$: Array<Post>
  id
  loaded: Boolean = false

  constructor(
    private sendService: SendService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => {
        this.id = params.id
        this.sendService.getOneUserCar(this.id).subscribe(data => {
          this.thisCar = data.car
          this.posts$ = data.post
          this.loaded = true
        })
      })
  }

}
