import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css'],
})
export class ValidationMessagesComponent {
  // pull errors, coming from the backend
  @Input() errorMessages: string[] | undefined;
}
