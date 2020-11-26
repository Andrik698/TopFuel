import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SendService } from '../send.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId
  usersCars$
  arr: Array<IProvider>
  modal: Boolean = false
  menu: Boolean
  showButton: Boolean

  constructor(
    public sendServise: SendService,
    private router: Router
    ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.menu = (event.target.innerWidth > 800) ? true:  false
    this.showButton = (event.target.innerWidth < 800) ? true:  false
  }

  ngOnInit(): void {
    this.menu = (window.innerWidth > 800) ? true:  false
    this.showButton = (window.innerWidth < 800) ? true:  false
    if (this.sendServise.isAuthenticate()) {
      this.userId = JSON.parse(localStorage.getItem('user'))._id
    }
    const id = {
      id: this.userId
    }
    this.sendServise.initial(id)
  }


  delete(id, carName) {
    let userCar = {
      _id: id,
      userId: JSON.parse(localStorage.getItem('user'))._id,
      carName
    }
    this.sendServise.deleteUserCar(userCar).subscribe(data => {
      this.sendServise.usersCars$ = data.cars
    })
    this.modal = false
  }

  activate() {
    let btnContainer = document.getElementById('mainMenu')
    let btns = btnContainer.getElementsByClassName('nav-item')
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var current = document.getElementsByClassName('active')
        current[0].className = current[0].className.replace(" active", '')
        this.className += ' active'
      })
    }
  }
}

interface IProvider {
    _id: string,
    brand: string,
    model: string,
    generation: string,
    bodyCar: string,
    engineVolume: string,
    gearbox: string,
    engineType: string,
    user: string
}
