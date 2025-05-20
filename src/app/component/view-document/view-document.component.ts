import { Component, OnInit,ElementRef, ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
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
    private http: HttpClient,
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userRole = this.service.getUserRole();
    alert(this.userRole)
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
}

