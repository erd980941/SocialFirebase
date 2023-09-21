import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:MembersComponent}
]


@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MembersModule { }
