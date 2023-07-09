import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AllDetailsComponent } from './components/all-details/all-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from "../shared/shared.module";
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AllProductsComponent, AllDetailsComponent, ProductComponent],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
  ],
  exports:[RouterModule]
})
export class ProductsModule {}
