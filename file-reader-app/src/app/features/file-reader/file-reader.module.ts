import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { FileReaderRoutingModule } from './file-reader-routing.module';

// Shared
import { SharedModule } from './../../shared/shared.module';

// Components
import { FileReaderComponent, EmployeesTableComponent } from './components';

/**
 * File Reader Module
 */
@NgModule({
  imports: [CommonModule, FileReaderRoutingModule, SharedModule],
  declarations: [FileReaderComponent, EmployeesTableComponent],
})
export class FileReaderModule {}
