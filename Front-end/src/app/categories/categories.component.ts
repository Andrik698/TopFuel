import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post, SendService} from "../send.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories
  posts$: Array<Post>
  loaded: Boolean = false
  param
  constructor(
    private route: ActivatedRoute,
    private sendService: SendService
  ) { }

  ngOnInit(): void {
    this.sendService.getCategories().subscribe(data => {
      this.categories = data
    })
    this.route.queryParams.subscribe(params  => {
      this.param = params
      this.sendService.getByCategory(params).subscribe(data => {
        this.posts$ = data
        this.loaded = true
      })
    })
  }

  load(category) {
    let activeCategory = ''
    for (let i = 0; i < 30; i++){
      if (this.param[i] == undefined) break
      activeCategory += this.param[i]
    }
    if (category !== activeCategory) this.loaded = false
  }
}
