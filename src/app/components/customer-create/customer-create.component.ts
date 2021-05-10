import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/services/customer.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  public newCustomer: Customer= new Customer(null,null,null,null,null,null,null);
  constructor(private customerService: CustomerService, private router: Router,private activatedRoute: ActivatedRoute) {
    this.stateOptions = [{label: 'NO', value: 'N'}, {label: 'YES', value: 'Y'}];
  }
  stateOptions: any[];
  ngOnInit(): void {
    this.loadCustomer()
  }

create():void{
this.customerService.save(this.newCustomer).subscribe(
  customer=>{
    this.router.navigate(['/customer/list']);
      swal.fire('New customer', `Customer ${this.newCustomer.name} succesfully created`, 'success')
  }
)
}

update():void{
  this.customerService.update(this.newCustomer).subscribe(
    customer=>{
      this.router.navigate(['/'])
      swal.fire('Updated Customer', `Customer ${this.newCustomer.name} succesfully updated!`, 'success')
    }
  )
}

loadCustomer():void{
  this.activatedRoute.params.subscribe(params=>{
    let id = params['id']
    if(id){
      this.customerService.findById(id).subscribe((currentCustomer)=>this.newCustomer=currentCustomer)
    }
  })
}


}
