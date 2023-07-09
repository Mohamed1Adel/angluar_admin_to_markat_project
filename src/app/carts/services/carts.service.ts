import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}
  getAllCards(param?: any) {
    let params = new HttpParams();
    console.log(param);
    params = params
      .append('startDate', param?.start)
      .append('endDate', param?.end);
    return this.http.get(environment.baseApi + 'carts', { params: params });
  }

  deleteCart(id:number){
    return this.http.delete(environment.baseApi + 'carts/' +id)
  }
}
