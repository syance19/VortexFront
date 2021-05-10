import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddShpr } from '../domain/addShpr';
import { Email } from '../domain/email';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private url: string = environment.apiUrl + '/api/cart';

  constructor(public httpClient: HttpClient) { }


  public createCart(email: Email): Observable<any> {
    return this.httpClient.post(this.url + '/createCart', email);
  }
  public clearCart(carId: number): Observable<any> {
    return this.httpClient.delete(this.url + '/clearCart/' );
  }

  public findShcaByPayIdNull(email: string): Observable<any> {

    return this.httpClient.get(this.url + '/findShcaByPayIdNull/' + email);
  }

  public addProduct(addShpr: AddShpr): Observable<any> {

    return this.httpClient.post(this.url + '/addProduct', addShpr);
  }
}
