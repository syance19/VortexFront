import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public  newProduct: Product = new Product(null,null,null,null,null,null)
  constructor(private productService: ProductService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.stateOptions = [{label: 'NO', value: 'N'}, {label: 'YES', value: 'Y'}];
  }
  stateOptions: any[];
  ngOnInit(): void {
    this.loadProducts();
  }

  update():void{
    this.productService.update(this.newProduct).subscribe(
      customer=>{
        this.router.navigate(['/product/list'])
        swal.fire('Updated Product Method', `Payment ${this.newProduct.name} succesfully updated!`, 'success')
      }
    )
  }
  loadProducts():void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.productService.findById(id).subscribe((currentProduct)=>this.newProduct=currentProduct)
      }
    })
  }
}
