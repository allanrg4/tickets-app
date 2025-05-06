import { Component } from '@angular/core';
import { TicketsQueueComponent } from "../../components/tickets-queue/tickets-queue.component";
import { TicketsResolvedComponent } from "../../components/tickets-resolved/tickets-resolved.component";
import { TicketsProcessComponent } from "../../components/tickets-process/tickets-process.component";

@Component({
  selector: 'app-admin',
  imports: [TicketsQueueComponent, TicketsResolvedComponent, TicketsProcessComponent],
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponent {

}
