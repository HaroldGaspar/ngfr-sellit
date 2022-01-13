import { NgModule } from '@angular/core';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [
    MatToolbarModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
