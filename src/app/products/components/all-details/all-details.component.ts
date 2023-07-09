import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrls: ['./all-details.component.css']
})
export class AllDetailsComponent {
id:any
data:any={}
  constructor(private route:ActivatedRoute,private service:ProductsService){
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProduct()
  }

  getProduct(){
    this.service.getProductById(this.id).subscribe((res:any)=>{
      this.data = res
    })
  }

}
