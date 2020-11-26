import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SendService } from '../send.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  carId
  post
  author
  comments
  img: string
  commentText: String
  answerText: String
  commentsCount: Number
  isPublished: Boolean
  modal: Boolean = false

  constructor(
    private sendService: SendService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sendService.getPost(this.route.snapshot.params.id).subscribe(data => {
        this.post = data
        this.author = data.author
        this.img = data.img
        this.comments = data.comments
        this.carId = data.carId
        this.commentsCount = data.commentsCount
        this.isPublished = data.published
    }, null, () => {
      this.img = this.img.slice(13, this.img.length-6)
    })
  }

  deletePost() {
    const id = {
      postId: this.route.snapshot.params.id,
      carId: this.carId
    }

    this.sendService.deletePost(id).subscribe(data => {
      console.log(data)
      if (data.status){
        this.router.navigate(['/usercar', this.post.carId])
      } else {
        this.sendService.alertError(data.msg)
      }
    })
  }

  publicPost(id, isPublic) {
    this.sendService.publicPost({id, isPublic}).subscribe(data => {
      if (data.status){
        this.sendService.alertSuccess(data.msg)
        this.isPublished = !this.isPublished
      } else {
        this.sendService.alertError(data.msg)
      }
    })
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

