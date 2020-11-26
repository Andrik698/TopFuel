import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from '../send.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string
  lastName: string
  userName: string
  email: string
  password: string
  repassword: string
  city: string

  /* allUsers = [] */
  allCities = []

  constructor(
    private sendServise: SendService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sendServise.addCities().subscribe(data => {
      this.allCities = data
    })
    /* this.sendServise.setUsers().subscribe((data) => {
      this.allUsers = data
    }) */
  }

  sendUser() {
    const user = {
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      email: this.email,
      password: this.password,
      city: this.city
    }

    this.sendServise.registerUser(user).subscribe((data) => {
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
/*   addCity() {
    if (this.city === undefined || null) return

    const city = {
      city: this.city
    }

    this.sendServise.sendCity(city).subscribe(data => {
      console.log(`${data.city} добавлен`)
    },
    error => console.log(error)
    )
    this.city = undefined
  }

  async getUsers() {

    for (let user of this.allUsers){
      console.log(user.name)
    }

  } */

}
