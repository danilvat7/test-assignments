import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'file-reader',
    loadChildren: () =>
      import('./features/file-reader/file-reader.module').then(
        (m) => m.FileReaderModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'file-reader' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
