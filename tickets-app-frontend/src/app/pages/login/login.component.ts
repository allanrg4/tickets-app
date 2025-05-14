import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly service = inject(AuthService);
  username = '';
  password = '';

  onSubmit() {
    this.service.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        // redirigir o guardar token si es necesario
      },
      error: (err) => {
        console.error('Error en login:', err);
        // mostrar mensaje de error si deseas
      }
    });
  }

}
