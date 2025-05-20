
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
  documentOriginal:any = {};
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
        this.documentOriginal = JSON.parse(JSON.stringify(data))
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  updateDocument(){
    const id = this.route.snapshot.paramMap.get('id');

    const original = JSON.stringify(this.documentOriginal);
    const current = JSON.stringify(this.document);

    if(original === current ){
      this.router.navigate(['/list']);
      console.log("nada alterado");
    }else{
    this.service.update(id,this.document)
      .subscribe(() => {
        alert('Documento atualizado com sucesso');
        this.router.navigate(['/list']);
      });
    }
  }

}
