import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
 
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
 
import { IonicStorageModule } from '@ionic/storage';

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
    RouterModule.forChild(routes),
	HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [SignupPage],
  providers: [
    Camera,
    File,
    WebView,
    FilePath
  ]
})
export class SignupPageModule {}
