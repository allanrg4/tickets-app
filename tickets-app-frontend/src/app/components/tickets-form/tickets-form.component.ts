import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tickets-form.component.html',
})
export class TicketsFormComponent {
  readonly fb = inject(FormBuilder);

  readonly ticketForm: FormGroup = this.fb.group({
    identification: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    status: ['', Validators.required],
    priority: ['', Validators.required],
    description: ['', Validators.required],
    createdAt: [new Date(), Validators.required],
    updatedAt: [new Date(), Validators.required],
  });


  sendData() {
    if (this.ticketForm.valid) {
      const datos = this.ticketForm.value;
      //this.webSocketService.enviar(datos); // Aquí lo mandas al WebSocket
    }
  }

}
