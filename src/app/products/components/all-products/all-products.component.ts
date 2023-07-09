
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/carts/Models/product';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent {
  products: product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  base64: any = '';

  form!: FormGroup;
  productIdUpdated:any=0

  constructor(private service: ProductsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getproducts();
    this.getCategories();

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  getproducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
        this.loading = false;
        console.log(this.products);
      },
      (err) => alert(err.status)
    );
  }
  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.loading = false;
        this.categories = res;
        console.log(res);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value);
    console.log(this.form);
  }

  getProductsCat(keyword: string) {
    this.loading = true;
    this.service.getProductsByCat(keyword).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  addToCart(event: any) {
    // console.log(event)

    // this.cartProducts = localStorage.getItem('cart')
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find(
        (item) => item.item.id == event.item.id
      );
      if (exist) {
        alert('product is already added in your cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }

    // localStorage.setItem('cart', JSON.stringify(event));
  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64);
      console.log(this.base64);
    };
  }

  addProdcut() {
    const model = this.form.value;
    this.service.cteateProduct(model).subscribe((res) => {
      alert('add product success');
    });
    console.log(this.form);
  }

  update(item: any) {
    // this.form.get('title')?.setValue(item.title);
    // this.form.get('description')?.setValue(item.description);
    // this.form.get('category')?.setValue(item.category);
    // this.form.get('price')?.setValue(item.price);
    // this.form.get('image')?.setValue(item.image);
    this.productIdUpdated = item.id;
    console.log(this.productIdUpdated)
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    });
    this.base64 = item.image;
  }

  updateProduct(form:any){
    console.log(form);
    this.service.updateProduct(this.productIdUpdated,form).subscribe((res)=>{
      console.log("product updated" , form)
    })
  }
}
