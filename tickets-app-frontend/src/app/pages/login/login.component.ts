import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly service = inject(AuthService);
  readonly router = inject(Router);

  username = '';
  password = '';

  onSubmit() {
    this.service.login(this.username, this.password).subscribe({
      next: (res) => {
        const { token, username, role, id } = res;
        const user: User = { id, username, role };
        this.service.setUser(user, token);
        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'RESOLVER':
            this.router.navigate(['/resolver']);
            break;
          case 'AGENT':
            this.router.navigate(['/agent']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
        console.log('Login exitoso:', res);
      },
      error: (err) => {
        console.error('Error en login:', err);
      }
    });
  }
}
