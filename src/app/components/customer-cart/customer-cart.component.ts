import { Router } from '@angular/router';
import { CartServiceService } from './../../services/cart-service.service';
import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { Table } from 'primeng/table';
import swal from 'sweetalert2';
@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {
  public shca: ShoppingCart[];
  public shpr: ShoppingProduct[];

  constructor(private authFirebaseService: AuthFirebaseService,private cartService: CartServiceService,private router: Router) { }

  ngOnInit(): void {
    this.findCart()
  }


  async findCart(){
    this.authFirebaseService.ofAuth.user.subscribe(
      data=>{
        if(data){
        this.cartService.findShcaByPayIdNull(data.email).subscribe(
          data=>{
          this.shca=data
          this.cartService.findShprByCarId(this.shca[0].carId).subscribe(
            data=>{
              this.shpr=data;
              console.log(this.shpr)
            }
          )
          }
        )
        }
      }
    )
  }
  clear(table: Table) {
    table.clear();
  }

back():void{
  this.router.navigate(['home-user'])
}

async deletePro(proId: string, proName: string, proCantidad: number) {

    this.cartService.removeProduct(this.shca[0].carId, proId).subscribe(
      data => {
        swal.fire(
          'Producto eliminado',
          proCantidad + ' ' + proName,
          'error'
        );
        this.findCart();

      }, error => {
        console.error(error);
      }
    );
}
}
