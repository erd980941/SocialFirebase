import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './shared/guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutsComponent,
    canActivate:[authGuard],
    children:[
      {path:'',component:HomeComponent,loadChildren:()=>import('./components/home/home.module').then(m=>m.HomeModule)},
      {path:'home',component:HomeComponent,loadChildren:()=>import('./components/home/home.module').then(m=>m.HomeModule)},
      {path:'profile',component:ProfileComponent,loadChildren:()=>import('./components/profile/profile.module').then(m=>m.ProfileModule)},
      {path:'members',component:MembersComponent,loadChildren:()=>import('./components/members/members.module').then(m=>m.MembersModule)}
    ]
  },
  {
    path:'login',
    loadChildren:()=>import('./components/auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
