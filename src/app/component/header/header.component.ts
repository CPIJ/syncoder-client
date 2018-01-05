import { Component, OnInit } from '@angular/core';
import { LocalContext } from '../../ultillity/local-context';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getUsername() {
    return LocalContext.loggedInClient.account.username
      .split(' ')
      .slice(0, 2)
      .map(s => s[0])
      .join()
      .toUpperCase();
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      LocalContext.loggedInClient = null;
      this.router.navigate(['']);
    }
  }
}
