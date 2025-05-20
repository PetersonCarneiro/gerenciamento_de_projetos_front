import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  documents: any[] = [];
  token: string | null = '';

  constructor(private http: HttpClient, private service: ServiceService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.service.list()
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
