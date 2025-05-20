import { Component, OnInit,ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit, AfterViewInit {
   @ViewChild('collapsible', { static: false }) collapsible!: ElementRef;
  document: any = {};
  items: any[] = [];
  hashole: string = '';
  userRole: string ='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
  ) {}

  ngAfterViewInit(): void {
    if (this.collapsible) {
      M.Collapsible.init(this.collapsible.nativeElement, {});
      console.log("Collapsible inicializado!");
    } else {
      console.error("Elemento collapsible não encontrado!");
    }
  }

  ngOnInit(): void{
    this.userRole = this.service.getUserRole();
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getDocumentById(id!).subscribe({
      next:(data) => {
        this.document = data;
        this.items = data.item;
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  deleteDoc(docId: string) {
    var confirme=confirm("Deseja realmente deletar esse processo ?");
    if(confirme==true){
      this.service.delete(docId)
      .subscribe({
        next: () => {
          alert("Documento deletado com sucesso!");
          this.router.navigate(['/list']);
        },
        error: (error) => {
            console.error('Erro ao salvar item:', error);
        }
      });
    }
  };
}

