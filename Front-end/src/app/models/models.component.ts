import { Component, OnInit } from '@angular/core';
import {Post, SendService} from "../send.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private sendService: SendService
  ) { }
  categories = ['Отзыв', 'История использования', 'Ремонт', 'Upgrade', 'Другое', 'Все разделы']
  cars$
  filterdPosts$
  changeBrand: Array<any>
  changeModel: Array<any>
  changeGeneration: Array<any>
  loaded: Boolean = false
  param

  ngOnInit(): void {
    this.route.queryParams.subscribe(params  => {
    this.param = params
    this.sendService.getCarsByFilter(params).subscribe(data => {
      this.filterdPosts$ = data
      this.loaded = true
    })
  })
    this.sendService.getAllCars().subscribe(data => {
      this.cars$ = data
      let set = new Set()
      for (let cars of this.cars$){
        set.add(cars.brand)
      }
      this.changeBrand = Array.from(set)
    })
  }

  loadGeneration(generation) {
    if (this.param.generation !== generation) this.loaded = false
  }

  brandChanged(brand) {
    /*if (this.param.brand !== brand) this.loaded = false*/
    const result = this.cars$.filter(cars => cars.brand === brand)
    let set = new Set()
    for (let cars of result){
      set.add(cars.model)
    }
    this.changeModel = Array.from(set)
    this.changeGeneration = []
  }

  modelChanged(model) {
    /*if (this.param.model !== model) this.loaded = false*/
    this.changeGeneration = this.cars$.filter(cars => cars.model === model)
  }

}
