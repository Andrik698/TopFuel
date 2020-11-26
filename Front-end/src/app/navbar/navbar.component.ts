import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendService } from '../send.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  toggle = false

  constructor(
    public sendServise: SendService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.sendServise.logOut()
    this.router.navigate['/auth']
  }
}
