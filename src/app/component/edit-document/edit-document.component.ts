
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

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
    private router: Router,
    private service: ServiceService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.service.getDocumentById(id)
    .subscribe({
      next: (data) => {
        this.document = data;
        this.items = data.item;
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  updateDocument(){
    const id = this.route.snapshot.paramMap.get('id');

    //this.http.put(`http://localhost:8080/document/${id}`, this.document, { headers })
    this.service.update(id,this.document)
      .subscribe(() => {
        alert('Documento atualizado com sucesso');
        this.router.navigate(['/list']);
      });
  }

}
