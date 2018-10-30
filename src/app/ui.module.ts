import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ButtonModule, CardModule, InputTextModule],
  exports: [ButtonModule, CardModule, InputTextModule]
})
export class UIModule {}
