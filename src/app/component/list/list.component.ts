import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  documents: any[] = [];
  token: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.get<any[]>('http://localhost:8080/document', { headers })
      .subscribe({
        next: (data) => {
          this.documents = data;
        },
        error: (err) => {
          console.error('Erro ao buscar documentos:', err);
        }
      });
  }
}
