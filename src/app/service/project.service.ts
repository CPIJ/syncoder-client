import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Template } from '../model/template';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getAllTemplates(): Observable<Template[]> {
    return this.http
      .get(environment.host + '/project/template')
      .map(res => res.json());
  }
}
