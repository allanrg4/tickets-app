import { Component } from '@angular/core';
import { TicketsFormComponent } from "../../components/tickets-form/tickets-form.component";
import { TicketsQueueComponent } from "../../components/tickets-queue/tickets-queue.component";

@Component({
  selector: 'app-agent',
  imports: [TicketsFormComponent, TicketsQueueComponent],
  templateUrl: './agent.component.html',
  styles: ``
})
export class AgentComponent {

}
