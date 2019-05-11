import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { 
        path: 'scoreboard', 
        loadChildren: '../scoreboard/scoreboard.module#ScoreboardPageModule' 
      },
      { 
        path: 'user-profile', 
        loadChildren: '../user-profile/user-profile.module#UserProfilePageModule' 
      },
      { 
        path: 'admin-page', 
        loadChildren: '../admin-page/admin-page.module#AdminPagePageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scoreboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
