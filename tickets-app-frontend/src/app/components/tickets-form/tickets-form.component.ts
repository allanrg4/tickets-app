import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketResource } from '../../resources/TicketResource';
import { CreateTicketDto } from '../../dtos/CreateTicketDto';

@Component({
  selector: 'app-tickets-form',
  imports: [ReactiveFormsModule],
  templateUrl: './tickets-form.component.html',
})
export class TicketsFormComponent {
  readonly fb = inject(FormBuilder);
  readonly resource = inject(TicketResource);

  readonly ticketForm: FormGroup = this.fb.group({
    identification: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required]],
    priority: ['', [Validators.required]],

  });

  onCreate() {
    if (this.ticketForm.valid) {
      const formData = this.ticketForm.value;

      this.resource.createTicket({
        identification: formData.identification,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        description: formData.description,
        priority: formData.priority,
      });

      this.ticketForm.reset();
    } else {
      console.warn('Formulario inválido. Revisa los campos:', this.ticketForm.errors);
      console.warn(this.ticketForm.getRawValue());
    }
  }
}
