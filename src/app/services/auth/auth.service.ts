import { Auth } from './../../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private userService: UserService) {}

	getToken() {
		return localStorage.getItem('token');
	}

	public authentify(auth: Auth): Observable<any> {
		return this.http.post<any>(environment.host + 'authenticate', auth, {
			withCredentials: true,
		});
	}
}
