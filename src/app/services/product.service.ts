import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string=  environment.apiUrl + '/api/product';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url+'/findAll');
  }

  public findById(idPro:string): Observable<any> {
    return this.httpClient.get(this.url+'/findById/'+idPro);
  }

  public save(product:Product ): Observable<any> {
    return this.httpClient.post(this.url+'/save',product,{headers: this.httpHeaders});
  }
  public update(product:Product): Observable<any>{
    return this.httpClient.put(this.url+'/update', product, {headers: this.httpHeaders});
  }

  public delete(idPro:string):Observable<any>{
    return this.httpClient.delete(this.url+'/delete/'+idPro,{headers:this.httpHeaders});
  }

  public findProductLike(product: string): Observable<any>{
    return this.httpClient.get(this.url+'/productLike/'+product);
  }

}
