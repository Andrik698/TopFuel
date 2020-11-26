import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SendService } from '../send.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
  providers: [DashboardComponent]
})
export class AddcarComponent implements OnInit {
  form: FormGroup

  user: string
  userName: string
  userId
  brand: string
  model: string
  generation: string
  img: string
  bodyCarSend: string
  engineVolumeSend: string
  gearboxSend: string
  engineTypeSend: string
  urlSend: string
  textSend:string
  carNameSend: string

  allCars: Array<Provider>
  changeBrand: Array<any>
  changeModel: Array<any>
  changeGeneration: Array<any>
  bodyCar = ['Седан', 'Хэтчбек', 'Лифтбек', 'Универсал', 'Внедорожник', 'Купе', 'Фургон']
  gearbox = ['Автомат', 'Робот', 'Вариатор', 'Механическая']
  engineVolume = ['0,8', '1,2', '1,6', '1,8', '2,0', '2,4', '2,6', '3,5', '4,0', '5,0', '6,0']
  engineType = ['Бензин', 'Дизель', 'Гибрид', 'Электро']

  constructor(
    private sendService: SendService,
    public dashboard: DashboardComponent
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      generation: new FormControl('', [Validators.required]),
      bodyCarSend: new FormControl('', [Validators.required]),
      engineVolumeSend: new FormControl('', [Validators.required]),
      gearboxSend: new FormControl('', [Validators.required]),
      engineTypeSend: new FormControl('', [Validators.required]),
      urlSend: new FormControl('', [Validators.required]),
      textSend: new FormControl('', [Validators.required, Validators.minLength(50)]),
      carNameSend: new FormControl('', [Validators.required])
    })

    if (this.sendService.isAuthenticate()) {
      this.user = JSON.parse(localStorage.getItem('user'))._id
      this.userName = JSON.parse(localStorage.getItem('user')).userName
      this.userId = JSON.parse(localStorage.getItem('user'))._id
    }
    this.sendService.getAllCars().subscribe(data => {
      this.allCars = data
      let set = new Set()
      for (let cars of this.allCars){
        set.add(cars.brand)
      }
      this.changeBrand = Array.from(set)
    })
  }
  addCarUser() {
    /*const car = {
      brand: this.brand,
      model: this.model,
      generation: this.generation,
      bodyCar: this.bodyCarSend,
      engineVolume: this.engineVolumeSend,
      gearbox: this.gearboxSend,
      engineType: this.engineTypeSend,
      img: this.urlSend,
      text: this.textSend,
      carName: this.carNameSend,

      user: this.user,
      userName: this.userName,
      postCount: Number,
      subscribersCar: Number
    }*/

    const car = {
      ...this.form.value,
      user: this.user,
      userName: this.userName,
      postCount: Number,
      subscribersCar: Number,
    }

    const id = {
      id: this.user
    }
    this.sendService.addCarUser(car).subscribe(data => {
      if (data.status) {
        this.sendService.initial(id)
      } else {
        this.sendService.alertError(data.msg)
      }
    })


  }

  getModel() {
      const result = this.allCars.filter(cars => cars.brand === this.form.value.brand)
      let set = new Set()
      for (let cars of result){
        set.add(cars.model)
      }
      this.changeModel = Array.from(set)
      this.changeGeneration = null
  }

  getGeneration() {
    this.changeGeneration = this.allCars.filter(cars => cars.model === this.form.value.model)
  }

  generationChanged() {
    this.allCars.filter(cars => {
      if(cars.generation === this.form.value.generation) this.img = cars.img
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
