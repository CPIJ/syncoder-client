import { Component, OnInit } from '@angular/core';
import { LocalContext } from '../../ultillity/local-context';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getUsername() {
    return LocalContext.loggedInClient.account.username
      .split(' ')
      .slice(0,2)
      .map(s => s[0])
      .join()
      .toUpperCase();
  }
}
