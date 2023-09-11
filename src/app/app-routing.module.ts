import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutsComponent,
    canActivate:[authGuard],
    children:[
      {path:'',component:HomeComponent,loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)},
      {path:'home',component:HomeComponent,loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)},
      {path:'profile',component:ProfileComponent,loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)}
    ]
  },
  {
    path:'login',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
