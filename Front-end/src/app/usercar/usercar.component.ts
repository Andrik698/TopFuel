import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Post, SendService} from '../send.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-usercar',
  templateUrl: './usercar.component.html',
  styleUrls: ['./usercar.component.scss']
})
export class UsercarComponent implements OnInit {
  private destroy$ = new Subject<undefined>()
  thisCar
  posts: Array<Post>
  id
  loaded: Boolean = false

  constructor(
    private sendService: SendService,
    private route: ActivatedRoute
  ) {
   }


  ngOnInit(): void {
      this.route.params
        .subscribe((params) => {
            this.id = params.id
            this.sendService.getOneUserCarProfile(this.id).subscribe(data => {
              this.thisCar = data.car
              this.posts = data.post
              this.loaded = true
            })
    })
  }
}


