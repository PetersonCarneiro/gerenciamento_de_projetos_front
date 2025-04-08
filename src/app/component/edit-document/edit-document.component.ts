import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
  document: any = {};
  items: any[] = [];
  id = this.route.snapshot.paramMap.get('id');


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ){}

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

  updateDocument(){
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put(`http://localhost:8080/document/${id}`, this.document, { headers })
      .subscribe(() => {
        alert('Documento atualizado com sucesso');
        this.router.navigate(['/list']);
      });
  }

}
