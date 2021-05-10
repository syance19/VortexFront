import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../domain/paymentMethod';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private url: string=  environment.apiUrl + '/api/paymentMethod';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url+'/findAll');
  }
  public save(payment:PaymentMethod ): Observable<any> {
    return this.httpClient.post(this.url+'/save',payment,{headers: this.httpHeaders});
  }

  public update(payment:PaymentMethod): Observable<any>{
    return this.httpClient.put(this.url+'/update', payment, {headers: this.httpHeaders});
  }
  public delete(id:number):Observable<any>{

    return this.httpClient.delete(this.url+'/delete/'+id);
  }
  public findById(id:number): Observable<any> {
    return this.httpClient.get(this.url+'/findById/'+id);
  }
}
