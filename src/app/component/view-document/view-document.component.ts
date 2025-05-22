import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
  userRole: string = '';
  errorMessage: string = '';


  newItem = {
    item: '',
    quantityPurchased: null,
    justification: '',
    budgetHeading: '',
    priorityDegree: '',
    expectedContractStart: '',
    expectedContractTermination: '',
    remainingDeadline: '',
    totalDurationContract: '',
    estimatedValueForTheYear: null,
    estimatedContractValue: null,
    type: '',
    contractNumber: '',
    contractingMode: '',
    termsOfReference: '',
    stateOfTheProcess: '',
    sustainabilityCriteria: '',
    slp: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
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
    this.userRole = this.service.getUserRole();
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('Id do documento não encontrado');
      this.router.navigate(['/list']);
      return;
    }

    this.loadDocument(id);
  }

  loadDocument(docId: string): void {
    this.service.getDocumentById(docId).subscribe({
      next: (data) => {
        this.document = data;
        this.items = data.item;
      },
      error: (err) => {
        console.error('Erro ao buscar documento:', err);
      }
    });
  }

  deleteDoc(docId: string): void {
    const confirme = confirm("Deseja realmente deletar esse processo?");
    if (confirme) {
      this.service.deleteDoc(docId).subscribe({
        next: () => {
          alert("Documento deletado com sucesso!");
          this.router.navigate(['/list']);
        },
        error: (error) => {
          console.error('Erro ao deletar processo:', error);
        }
      });
    }
  }

  deleteItem(itemId: string, docId: string): void {
    const confirme = confirm("Deseja realmente deletar esse item?");
    if (confirme) {
      this.service.deleteItem(itemId).subscribe({
        next: () => {
          alert("Item deletado com sucesso!");
          this.loadDocument(docId);
        },
        error: (error) => {
          console.error("Erro ao deletar item:", error);
        }
      });
    }
  }

  addItem(): void {
  const docId = this.document._id || localStorage.getItem('docId');

    if (!docId) {
      this.errorMessage = 'Erro: Nenhum documento associado!';
      return;
    }

    const itemToAdd = { ...this.newItem, documentId: docId };

    // Adiciona na lista local
    this.items.push(itemToAdd);

    // Persiste via API
    this.service.createItem(itemToAdd).subscribe({
      next: () => {
        //alert('Item adicionado com sucesso!');
        this.loadDocument(docId);
      },
      error: (err) => {
        console.error('Erro ao adicionar item:', err);
      }
    });

  }
}
