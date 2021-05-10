import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import swal from 'sweetalert2'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public listProducts: Product[];

  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.findAllProducts();
  }


  findAllProducts():void{
    this.productService.findAll().subscribe((products)=>{
      this.listProducts=products;
    })
  }
  clear(table: Table) {
    table.clear();
  }
  edit(id:string):void{
    this.router.navigate(['/product/edit/'+id]);
  }

  delete(idPro:string):void{
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(idPro);
        this.productService.delete(idPro).subscribe( product=>{
          this.findAllProducts()
          console.log(product)
        }
        )
        swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        )
        this.router.navigate(['/']);
      }
    })
   }

}
