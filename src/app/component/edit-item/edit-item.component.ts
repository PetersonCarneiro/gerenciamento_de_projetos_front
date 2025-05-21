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

    this.service.getItemById(itemId)
    .subscribe({
      next: (data) => {
        this.document = data;
        this.item = data.item;
        this.itemOriginal = JSON.parse(JSON.stringify(data.item))
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  updateItem():void{

  }

}
