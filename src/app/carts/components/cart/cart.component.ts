import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { product } from '../../Models/product';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private service: CartsService,
    private productService: ProductsService,
    private fb: FormBuilder
  ) {}
  carts: any[] = [];
  products: any[] = [];

  total = 0;
  form!: FormGroup;
  details: any;
  ngOnInit(): void {
    this.form = this.fb.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();

  }

  getAllCarts() {
    this.service.getAllCards().subscribe((res: any) => {
      this.carts = res;
    });
  }

  applyFilter() {
    let date = this.form.value;
    console.log(date);
    this.service.getAllCards(date).subscribe((res: any) => {
      this.carts = res;
    });
  }

  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe((res: any) => {
      this.getAllCarts();
      alert('cart delete success');
    });
  }

  getTotalPrice() {
    for (let x in this.details) {
      this.total;
    }
  }
  view(i: number) {
    this.products = [];
    this.total=0;
    this.details = this.carts[i];
    console.log(this.details);
    for (let x in this.details.products) {
      this.productService
        .getProductById(this.details.products[x].productId)
        .subscribe((res) => {
          this.products.push({
            item: res,
            quantity: this.details.products[x].quantity,
          });
          for (let x in this.products) {
            this.total +=
              this.products[x].item.price * this.details.products[x].quantity;
            console.log(this.total);
          }
        });
    }
  }



}
