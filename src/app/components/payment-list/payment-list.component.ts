import  swal  from 'sweetalert2';
import { PaymentMethod } from './../../domain/paymentMethod';
import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  public listPayments: PaymentMethod[];
  constructor(private paymentService: PaymentMethodService, private router: Router) { }

  ngOnInit(): void {
    this.findAllPayments();
  }


  findAllPayments():void{
    this.paymentService.findAll().subscribe((payments)=>
    this.listPayments=payments);
  }
  clear(table: Table) {
    table.clear();
  }
  edit(id:number):void{
    this.router.navigate(['/payment/form/'+id]);
  }
  delete(idPro:number):void{
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
        this.paymentService.delete(idPro).subscribe( product=>{
          this.findAllPayments();
        }
        )
        swal.fire(
          'Deleted!',
          'The payment has been deleted.',
          'success'
        )
        this.router.navigate(['/payment/list']);
      }
    })
   }
}
