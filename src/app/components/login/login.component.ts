import { CartServiceService } from 'src/app/services/cart-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import swal from 'sweetalert2'
import { Email } from 'src/app/domain/email';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { Customer } from 'src/app/domain/customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ema: string = "";
  public pass: string = "";
  public email: Email = new Email(null);
  public shoppingCarts: ShoppingCart[] = [];
  public customer: Customer;
  constructor(private router: Router, private authFirebaseService: AuthFirebaseService, private customerService: CustomerService, private cartService: CartServiceService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authFirebaseService.loginFirebase(this.ema, this.pass).then(
      result => {
        if (result) {
          if (result.user.emailVerified == true) {
            this.customerService.findById(this.ema).subscribe(
              user => {
                localStorage.setItem('rol', user.role)
                localStorage.setItem('enable', user.enable)
                if (user.role == 'A') {
                  this.router.navigate(['/']);
                } else {
                  this.cartService.findShcaByPayIdNull(this.ema).subscribe(data => {
                    this.shoppingCarts = data;
                    if (this.shoppingCarts == null) {
                      this.email.email = this.ema
                      this.cartService.createCart(this.email).subscribe((cart) => {
                        swal.fire(
                          'Info',
                          'A new car has been created',
                          'info'
                        )
                      })
                    }
                  }
                  )
                  this.router.navigate(['home-user']);
                  swal.fire(
                    'Info',
                    `Welcome again ${this.ema} lets shop`,
                    'info'
                  )
                }
              }
            )
          } else {
            swal.fire(
              'Error',
              'You must verified your email',
              'error'
            )
          }
        }
      }
    )
  }




}
