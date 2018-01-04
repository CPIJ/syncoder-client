import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication-service.service';
import { LocalContext } from '../../ultillity/local-context';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthenticationService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
      client => {
        LocalContext.loggedInClient = client;
      },
      error => alert(error._body)
      )

  }

  forgotPassword() {
    this.authenticationService.forgotPassword(this.email)
      .subscribe(
      response => alert(`Your password is: ${response.password}`),
      error => alert(error._body)
      )
  }
}
