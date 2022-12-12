import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public save(userModule: User): Observable<User> {
    console.log('service add' + userModule);

    return this.http.post<User>(environment.host + 'AddUser', userModule);
  }
  public findbyEmail(email: User): Observable<User> {
    return this.http.post<User>(environment.host + 'User/findByEmail', email);
  }
}
