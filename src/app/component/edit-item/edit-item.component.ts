import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item: any = {};
  itemOriginal: any = {};
  document: any = {};
  documentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    console.log('itemId:', itemId);
    this.documentId =itemId;

    this.service.getItemById(itemId)
    .subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.document = data;
        this.item = data;
        this.documentId = data.documentId;
        this.itemOriginal = JSON.parse(JSON.stringify(data.item))
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  updateItem(){
    //pega o id do item
    const id = this.route.snapshot.paramMap.get('id');

    const original = JSON.stringify(this.itemOriginal);
    const current = JSON.stringify(this.item);

    if(original === current ){
      this.router.navigate(['/document/'+this.documentId]);
      console.log("nada alterado");
    }else{
    this.service.updateItem(id, this.documentId, this.item)
      .subscribe(() => {
        alert('Documento atualizado com sucesso');
        this.router.navigate(['/document/'+this.documentId]);
      });
    }
  }

}
