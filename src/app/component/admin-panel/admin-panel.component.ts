import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication-service.service';
import { Account } from '../../model/account';
import { StompService } from 'ng2-stomp-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  accounts: Account[]

  constructor(private service: AuthenticationService, private stomp: StompService) { }

  ngOnInit() {
    this.service.getAllAccounts().subscribe(
      accounts => this.accounts = accounts,
      error => console.error(error)
    )

    this.stomp.configure({
      host: environment.host + '/syncoder',
      queue: ''
    });

    this.stomp.startConnect()
    .then(() => this.configureSubscriptions())
  }

  configureSubscriptions() {
    this.stomp.subscribe('/topic/onRegister', (response: Account[]) => {
      this.accounts = response;
    })
  }
}
