import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { Customer } from 'src/app/domain/customer';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { CustomerService } from 'src/app/services/customer.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  public listCustomers:Customer[];
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.findAllCustomers()
  }

  findAllCustomers():void{
    this.customerService.findAll().subscribe((customers)=>{
      this.listCustomers=customers;
    })
  }

  clear(table: Table) {
    table.clear();
  }

edit(id:string):void{
  this.router.navigate(['/customer/edit/'+id]);
}


 delete(email:string):void{
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
      this.customerService.delete(email).subscribe( customer=>{
        this.findAllCustomers()
      }
      )
      swal.fire(
        'Deleted!',
        'The customer has been deleted.',
        'success'
      )
      this.router.navigate(['/customer/list']);
    }
  })
 }

}

