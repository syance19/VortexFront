import { Email } from './../../domain/email';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';
import { AddShpr } from 'src/app/domain/addShpr';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import swal from 'sweetalert2';
@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  public listProducts: Product[];
  items: MenuItem[];
  public like: string = '';
  public addShpr: AddShpr = new AddShpr(0, "", 0);
  public shca: ShoppingCart[];
  constructor(private authFirebaseService: AuthFirebaseService,private router: Router,private productService: ProductService, private cartService: CartServiceService) { }
  visibleSidebar1;
  ngOnInit() {
    this.findAllProducts();
    this.items = [


      {label: 'Ver carrito', icon: 'pi pi-info', routerLink:['/customer/cart']},
      {separator:true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']},
      {label:'Logout',icon:'pi pi-fw pi-power-off',command:() =>{
        this.logout();
      }}
  ];
  this.findShca();
}
findShca(): void {
   this.authFirebaseService.ofAuth.user.subscribe(
    data => {
      if (data) {
        this.cartService.findShcaByPayIdNull(data.email).subscribe(
          data => {
            if (data) {
              this.shca = data;
            }

          }
        );
      }
    }
  );

}

async logout() {
  try {
    await this.authFirebaseService.logoutFirebase();
    localStorage.clear();
    this.router.navigate(['login']);
  } catch (error) {

  }
}

findAllProducts():void{
  this.productService.findAll().subscribe((products)=>{
    this.listProducts=products;
  })
}

busqueda(): void {
  if (this.like === null || this.like === '') {
    this.findAllProducts();

  } else {
    this.productService.findProductLike(this.like).subscribe(data => {
      this.listProducts = data;
    }, error => {
      console.log(error);
    });
  }
}
addProduct(proId: string, proName: string, cantidad:number): void {
  this.addShpr = new AddShpr(this.shca[0].carId, proId, cantidad);
  this.cartService.addProduct(this.addShpr).subscribe(
    data => {
      swal.fire(
        'Producto agregado',
        cantidad + ' ' + proName,
        'success'
      );

    }, error => {
      console.log(error);
    }
  );
}

}
