import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/components/layouts/footer/footer.component';
import { NavbarComponent } from 'src/app/components/layouts/navbar/navbar.component';



const routes:Routes=[
  {path:'',component:LayoutsComponent}
]

@NgModule({
  declarations: [
    LayoutsComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    LayoutsComponent
  ]
})
export class LayoutsModule { }
