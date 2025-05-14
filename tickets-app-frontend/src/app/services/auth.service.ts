import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly http = inject(HttpClient)
  private baseUrl = 'http://localhost:8080';

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/api/v1/auth/token`, {
      username, password 
    });
  }

}
