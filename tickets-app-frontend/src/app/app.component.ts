import { Component, inject } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TicketsManager'

  readonly router = inject(Router)

  isLoginRoute() {
    return this.router.url === '/login'
  }
}
