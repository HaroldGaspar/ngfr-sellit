import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MystoreComponent } from './mystore.component';
import { MystoreModule } from './mystore.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'mystore', component: MystoreComponent },
      { path: '**', redirectTo: '/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MystoreRoutingModule {}
