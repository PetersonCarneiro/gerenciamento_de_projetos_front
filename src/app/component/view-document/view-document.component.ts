import { Component, OnInit,ElementRef, ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as M from 'materialize-css';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit, AfterViewInit {
   @ViewChild('collapsible', { static: false }) collapsible!: ElementRef;
  document: any = {};
  items: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (this.collapsible) {
      M.Collapsible.init(this.collapsible.nativeElement, {});
      console.log("Collapsible inicializado!");
    } else {
      console.error("Elemento collapsible não encontrado!");
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`http://localhost:8080/document/id/${id}`, { headers })
    .subscribe({
      next: (data) => {
        this.document = data;
        this.items = data.item; // <-- Aqui você extrai os itens do documento
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });

  }
}
