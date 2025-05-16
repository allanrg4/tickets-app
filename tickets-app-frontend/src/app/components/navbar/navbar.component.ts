import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  readonly router = inject(Router);

  user = this.authService.currentUser;

  userName = computed(() => this.user()?.username ?? 'Invitado');
  userRole = computed(() => this.user()?.role.toUpperCase() ?? '');

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.user.set(null);

  // Redirecciona al login
  this.router.navigate(['/login']);
}


}
