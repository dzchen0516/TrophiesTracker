import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

const routes: Routes = [
  {
    path: '',
    component: SignupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
	ImagePicker
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
