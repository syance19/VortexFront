import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/services/customer.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  public newCustomer: Customer= new Customer(null,null,null,null,null,null,null);
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private customerService: CustomerService) {
    this.stateOptions = [{label: 'NO', value: 'N'}, {label: 'YES', value: 'Y'}];
  }
  stateOptions: any[];
  ngOnInit(): void {
    this.loadCustomer();
  }


  loadCustomer():void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.customerService.findById(id).subscribe((currentCustomer)=>this.newCustomer=currentCustomer)
      }
    })
  }

  update():void{
    this.customerService.update(this.newCustomer).subscribe(
      customer=>{
        this.router.navigate(['/customer/list'])
        swal.fire('Updated Customer', `Customer ${this.newCustomer.name} succesfully updated!`, 'success')
      }
    )
  }

}
