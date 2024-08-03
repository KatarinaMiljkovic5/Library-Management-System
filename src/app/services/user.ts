import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  login(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }
}
