import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  item:any
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${environment.baseApi}products`);
  }

  getAllCategories() {
    return this.http.get(`${environment.baseApi}products/categories`);
  }
  getProductsByCat(keyword: string) {

    return this.http.get(
      `${environment.baseApi}products/category/${keyword}`
    );
  }

  getProductById(id:any){
    return this.http.get(environment.baseApi + "products/" + id)
  }


  cteateProduct(model:any){
    return this.http.post(environment.baseApi +'products',model)
  }

  updateProduct(id:any , model:any){
    return this.http.put(environment.baseApi + 'products/'+id, model);
  }
}
