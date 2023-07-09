import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllDetailsComponent } from './products/components/all-details/all-details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';

const routes: Routes = [
  {
    path: "products",component:AllProductsComponent
  },
  {
    path:"details/:id",component:AllDetailsComponent
  },
  {
    path:"cart",component:CartComponent
  },
  {
    path:"**",redirectTo:"cart",pathMatch:"full"
  }
];

@NgModule({
  imports: [CommonModule,BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
