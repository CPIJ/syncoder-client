import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account'
import { AuthenticationService } from '../../service/authentication-service.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [AuthenticationService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  account: Account = new Account()

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    if ((this.account.email && this.isValidEmail(this.account.email)) &&  this.account.password && this.account.username) {
      this.authenticationService.register(this.account)
        .subscribe(
          success => alert(success.message),
          error => alert(error)
        );
    }
  }

  isValidEmail(email: string): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}
