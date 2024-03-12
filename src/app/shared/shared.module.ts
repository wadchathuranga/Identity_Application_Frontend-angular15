import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidationMessagesComponent, NotFoundComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class SharedModule {}
