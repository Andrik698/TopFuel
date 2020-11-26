import { Component, OnInit } from '@angular/core';
import { SendService } from '../send.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup

  userCars$
  cities: String
  user
  carOfUser: String
  aboutUser: String

  constructor(
    private sendService: SendService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.user = user
    this.carOfUser = user.userCar
    this.aboutUser = user.aboutUser

    this.sendService.getUsersCars({id: user._id}).subscribe( data => {
      this.userCars$ = data.cars
    })
    if (!this.carOfUser) this.carOfUser = 'Пешком'
    this.form = new FormGroup({
      name: new FormControl(user.name, [Validators.minLength(2), Validators.required]),
      lastname: new FormControl(user.lastName, [Validators.minLength(2), Validators.required]),
      userName: new FormControl(user.userName, [Validators.minLength(6), Validators.required]),
      city: new FormControl(user.city, Validators.required),
      aboutUser: new FormControl(this.aboutUser),
      userCar: new FormControl(this.carOfUser, Validators.minLength(0)),
    })

    this.sendService.addCities().subscribe(data => {
      this.cities = data
    })
  }

  updateUser() {
    if (this.form.valid) {
      const user = {...this.form.value, id: this.user._id}
      this.sendService.updateUser(user).subscribe(data => {
        console.log(data)
        this.sendService.setInStorage(data.user)
      })
    }
  }

}
