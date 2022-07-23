import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule]
})
export class SharedModule {}
