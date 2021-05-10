import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../domain/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string=  environment.apiUrl + '/api/customer';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url+'/findAll');
  }
  public save(user:Customer ): Observable<any> {
    return this.httpClient.post(this.url+'/save',user,{headers: this.httpHeaders});
  }

  public update(user:Customer): Observable<any>{
    return this.httpClient.put(this.url+'/update', user, {headers: this.httpHeaders});
  }
  public delete(email:string):Observable<any>{
    return this.httpClient.delete(this.url+'/delete/'+email,{headers:this.httpHeaders});
  }

  public findById(email:string): Observable<any> {
    return this.httpClient.get(this.url+'/findById/'+email);
  }
}
