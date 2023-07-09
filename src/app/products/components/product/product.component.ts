import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from 'src/app/carts/Models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() data!: product;
  @Output() item:any = new EventEmitter();
  addButton: boolean = false;
  amount: number = 0;
  constructor() {}

  add() {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
}
