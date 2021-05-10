import { PaymentMethodService } from './../../services/payment-method.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import swal from 'sweetalert2'
@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {

  public newPayment: PaymentMethod = new PaymentMethod(null,null,null);
  constructor(private paymentService: PaymentMethodService,private router: Router,private activatedRoute: ActivatedRoute) {
    this.stateOptions = [{label: 'NO', value: 'N'}, {label: 'YES', value: 'Y'}];
  }

  stateOptions: any[];
  ngOnInit(): void {
    this.loadPayments();
  }

  create():void{
    this.paymentService.save(this.newPayment).subscribe(
      paymet=>{
        this.router.navigate(['/payment/list']);
        swal.fire('New Payment Method', `Payment ${this.newPayment.name} succesfully created`, 'success')
    }
    )
  }


update():void{
  this.paymentService.update(this.newPayment).subscribe(
    customer=>{
      this.router.navigate(['/payment/list'])
      swal.fire('Updated Payment Method', `Payment ${this.newPayment.name} succesfully updated!`, 'success')
    }
  )
}

loadPayments():void{

  this.activatedRoute.params.subscribe(params=>{
    let id = params['id']
    if(id){
      this.paymentService.findById(id).subscribe((currentPayment)=>this.newPayment=currentPayment)
    }
  })
}
}
