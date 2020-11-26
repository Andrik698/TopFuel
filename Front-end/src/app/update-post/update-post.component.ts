import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendService } from '../send.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  userId
  userPost$
  post
  cars: Array<Provider>
  categories
  image: string
  title: string
  createDate: string

  selectedCarId: string
  postBody: string
  selectedCategory: string
  selectedSubTitle: String

  constructor(
    private sendService: SendService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sendService.getCategories().subscribe(data => {
      this.categories = data
    })
    if (this.sendService.isAuthenticate()) {
      const idPost = this.router.snapshot.params.id
     this.sendService.getPostToUpdate(idPost).subscribe( data => {
      this.userPost$ = data
      this.post = this.userPost$.img + this.userPost$.postbody
      this.selectedCategory = this.userPost$.category
      this.title = this.userPost$.title
      this.createDate = this.userPost$.date
      this.selectedSubTitle = this.userPost$.subTitle
    })
    }
  }

  updatePost() {
    let indexEnd = this.post.indexOf('"></p>')
    if (this.post.indexOf('<p><img src') !== 0 ) {
      return
    }

    let postText = this.post.slice(indexEnd + 6)
    if (postText.indexOf('<img src') == 0 ) {
      return
    }

    let img = (this.post.substring(0, indexEnd)) + '"></p>'

    if (img.includes('img src', 10)) {
      return
    }
    this.image = img

    const post = {
      postId: this.router.snapshot.params.id,
      title: this.title,
      subTitle: this.selectedSubTitle,
      category: this.selectedCategory,
      img: this.image,
      postbody: postText,
      updateDate: Date.now(),
    }

    this.sendService.updatePost(post).subscribe(data => {
      if (data.status){
        this.alertSuccess(data.msg)
      } else {
        this.alertError(data.msg)
      }
    })
  }

  alertSuccess(msg) {
    document.getElementById('success').hidden = false
    document.getElementById('success').innerHTML = msg
    setTimeout(() => {
      document.getElementById('success').hidden = true
    }, 3000);
  }

  alertError(msg) {
    document.getElementById('fool').hidden = false
    document.getElementById('fool').innerHTML = msg
    setTimeout(() => {
      document.getElementById('fool').hidden = true
    }, 3000);
  }
}

interface Provider{
    _id: string
    brand: string
    model: string
    generation: string
    img: string
}
