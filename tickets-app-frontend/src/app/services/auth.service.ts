import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  currentUser = signal<User | null>(this.loadUserFromStorage());

  login(username: string, password: string) {
    return this.http.post<{ token: string; id: number; username: string; role: User['role'] }>(
      `${this.baseUrl}/api/v1/auth/token`,
      { username, password }
    );
  }

  setUser(user: User, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
