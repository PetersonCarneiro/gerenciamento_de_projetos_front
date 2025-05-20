import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  private local(type: string): string{
    const localServer = '192.168.0.107';
    const localhost = 'localhost';
      if(type === 'S'){
        return localServer;
      }else{
        return localhost;
      }
  }

  private getBaseUrl(): string{
    const host = this.local('2');
    return `http://${host}:8080`;
  }

  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserRole(): string{
    const token = localStorage.getItem('jwtToken');
    if(!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || '';
  }

  //register-doc-page
  createDocument(data: any): Observable<any>{
    const url = `${this.getBaseUrl()}/document`;
    return this.http.post<any>(url,data,{headers: this.getHeaders()})
  }

  //createItem
  createItem(item:any): Observable<any>{
    const url = `${this.getBaseUrl()}/items`;
    return this.http.post<any>(url,item,{headers: this.getHeaders()})
  }

  //login
  loginUser(loginData:any): Observable<{token: string, id: string}>{
    const url = `${this.getBaseUrl()}/auth/login`;
    return this.http.post<{ token: string, id: string }>(url, loginData);
  }

  //registerUser
  registerUser(formData: any): Observable<any>{
    const url = `${this.getBaseUrl()}/auth/register`;
    return this.http.post(url,formData)
  }

  //list
  list(): Observable<any>{
    const url = `${this.getBaseUrl()}/document`;
    return this.http.get<any[]>(url,{headers: this.getHeaders()})
  }

  //getID
  getID(id:any): Observable<any>{
    const url = `${this.getBaseUrl()}/document/id/${id}`;
    return this.http.get<any[]>(url,{headers: this.getHeaders()})
  }
    //view-document
  getDocumentById(id:any): Observable<any>{
    const url = `${this.getBaseUrl()}/document/id/${id}`;
    return this.http.get<any>(url,{headers: this.getHeaders()});
  }

  //update
  update(id:any, document:any): Observable<any>{
    const url = `${this.getBaseUrl()}/document/${id}`;
    return this.http.put<any[]>(url,document,{headers: this.getHeaders()})
  }

  //delete
  delete(id:any): Observable<any>{
    const url = `${this.getBaseUrl()}/document/${id}`;
    return this.http.delete<any[]>(url,{headers: this.getHeaders()})
  }
}
