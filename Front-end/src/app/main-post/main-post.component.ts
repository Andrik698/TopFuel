import { Component, OnInit } from '@angular/core';
import {Post, SendService} from "../send.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {

  categories
  carId
  post: Post
  author
  comments
  img: string
  commentText: String
  answerText: String
  commentsCount: Number
  mutedUser: Boolean

  loaded: Boolean = false

  constructor(
    private sendService: SendService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sendService.getCategories().subscribe(data => {
      this.categories = data
    })
    this.sendService.getPost(this.route.snapshot.params.id).subscribe(data => {
      this.post = data
      this.author = data.author
      this.img = data.img
      this.comments = data.comments
      this.carId = data.carId
      this.commentsCount = data.commentsCount
    }, null, () => {
      this.loaded = true
      this.img = this.img.slice(13, this.img.length-6)
    })
    if (this.sendService.isAuthenticate()) {
      this.mutedUser = JSON.parse(localStorage.getItem('user')).mute
    }
  }

  likePost() {
    const like = {
      postId: this.route.snapshot.params.id,
      userId: JSON.parse(localStorage.getItem('user'))._id
    }

    this.sendService.likePost(like).subscribe(data => {
      this.post.likes = data.likes
    })
  }

  addComent() {
    const comment = {
      postId: this.route.snapshot.params.id,
      userId: JSON.parse(localStorage.getItem('user'))._id,
      userName: JSON.parse(localStorage.getItem('user')).userName,
      text: this.commentText,
      date: Date.now(),
    }
    this.sendService.addComment(comment).subscribe(data => {
      this.comments = data.comments
      this.commentsCount = data.commentsCount
    })

    this.commentText = ""
  }

  addAnswer(commentId) {
    const comment = {
      id: commentId,
      postId: this.route.snapshot.params.id,
      userId: JSON.parse(localStorage.getItem('user'))._id,
      userName: JSON.parse(localStorage.getItem('user')).userName,
      text: this.answerText,
      date: Date.now(),
    }

    this.sendService.addAnswer(comment).subscribe(data => {
      this.comments = data.comments
      this.commentsCount = data.commentsCount
    })
    document.getElementById(commentId).hidden = true
    this.answerText = ""
  }

  showForm(commentId) {
    document.getElementById(commentId).hidden = false
  }

}
