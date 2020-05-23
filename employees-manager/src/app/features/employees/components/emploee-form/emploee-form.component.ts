import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Interfaces
import { IEmployee } from './../../../../interfaces';

/**
 * Emploee Form Component
 */
@Component({
  selector: 'app-emploee-form',
  templateUrl: './emploee-form.component.html',
  styleUrls: ['./emploee-form.component.scss'],
})
export class EmploeeFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<IEmployee>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Inits form fields
   */
  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      age: [null, [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * Handles form submit
   */
  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }
}
