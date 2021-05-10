import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public newRegister: Customer = new Customer(null,null,'Y',null,null,null,'U');
  constructor(private authFirebaseService: AuthFirebaseService, private router: Router, public customerService: CustomerService
   ,) {

  }

  ngOnInit(): void {

  }

  register() {
    this.authFirebaseService.registerFirebase(this.newRegister.email, this.newRegister.token).then(result => {
      this.newRegister.token = result.user.uid;
      this.newRegister.role = "U";

          this.customerService.save(this.newRegister).subscribe(
            ok => {
              localStorage.clear();
              swal.fire(
                'Info',
                'You must verified your email first before login',
                'info'
              )
              this.router.navigate(['login']);
            },
            err => {
              console.log(err)
            }
          );
        }
    ).catch((error) => {
     console.log(error)
    });
  }

}
