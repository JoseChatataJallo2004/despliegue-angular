import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://incredible-magic-production.up.railway.app';

  constructor(private http: HttpClient) { }

  registerUser(email: string, username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { email, username, password };
    return this.http.post(url, body);
  }
}
