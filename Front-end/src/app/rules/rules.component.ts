import { Component, OnInit } from '@angular/core';
import {SendService} from "../send.service";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
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
