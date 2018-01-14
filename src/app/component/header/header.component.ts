import { Component, OnInit } from '@angular/core';
import { LocalContext } from '../../ultillity/local-context';
import { Router } from '@angular/router';
import { Client } from '../../model/client';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  client: Client = LocalContext.loggedInClient;

  constructor(private router: Router) { }

  ngOnInit() { }

  getUsername() {
    return LocalContext.loggedInClient.account.username
      .split(' ')
      .slice(0, 2)
      .map(s => s[0])
      .join('')
      .toUpperCase();
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.router.navigate([''], {queryParams: {action: 'clearUser'}});
    }
  }
}
