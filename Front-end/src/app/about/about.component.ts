import { Component, OnInit } from '@angular/core';
import {SendService} from "../send.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  categories

  constructor(
    private sendService: SendService,
  ) { }

  ngOnInit(): void {
    this.sendService.getCategories().subscribe(data => {
      this.categories = data
    })
  }

}
