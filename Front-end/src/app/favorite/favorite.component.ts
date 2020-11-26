import { Component, OnInit } from '@angular/core';
import {Post, SendService} from "../send.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  posts$: Array<Post>
  loaded: Boolean = false

  constructor(
    private sendService: SendService
  ) { }

  ngOnInit(): void {
    const posts = JSON.parse(localStorage.getItem('user')).likedPosts
    let postsId = []
    for (let post of posts) {
      postsId.push(post.post)
    }

    this.sendService.getFavoritePosts({posts: postsId}).pipe(
      take(1)
    ).subscribe( data => {
      this.posts$ = data
      this.loaded = true
      console.log(data)
    })
  }

}
