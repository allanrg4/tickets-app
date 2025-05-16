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
      next: (res: any) => {
        console.log('Login exitoso:', res);

        const { token, username, role, id } = res;

        localStorage.setItem('token', token);
        const user: User = { id, username, role };
        localStorage.setItem('user', JSON.stringify(user));

        switch (role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'resolver':
            this.router.navigate(['/resolver']);
            break;
          case 'agent':
            this.router.navigate(['/agent']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
      }
    });
  }
}
