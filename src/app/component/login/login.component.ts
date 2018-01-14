import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication-service.service';
import { LocalContext } from '../../ultillity/local-context';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [AuthenticationService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.action) {
        if (params.action === 'clearUser') {
          LocalContext.loggedInClient = null;
        }
      }
    })
  }

  login() {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
      client => {
        LocalContext.loggedInClient = client;
        this.router.navigate(['home']);
      },
      error => {
        const object = JSON.parse(error._body);
        alert(object.message);
      }
      );
  }

  forgotPassword() {
    this.authenticationService.forgotPassword(this.email)
      .subscribe(
      response => alert(`${response.message}`),
      error => {
        const object = JSON.parse(error._body);
        alert(object.message);
      }
      );
  }
}
