import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';


const customerRoutes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component : CustomerListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
