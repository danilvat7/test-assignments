import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileReaderComponent } from './components';

const routes: Routes = [{ path: '', component: FileReaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileReaderRoutingModule {}
