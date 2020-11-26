import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from '../send.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email: string
  password: string

  constructor(
    private sendServise: SendService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  auth() {
    const user = {
      email: this.email,
      password: this.password
    }


    this.sendServise.authUser(user).subscribe(data => {
      if (data.status){
        this.sendServise.setInStorage(data.user)
        let userId = {
          id: JSON.parse(localStorage.getItem('user'))._id
        }
        this.sendServise.initial(userId)
        this.router.navigate(['/'])
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
