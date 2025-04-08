import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-register-item-page',
  templateUrl: './register-item-page.component.html',
  styleUrls: ['./register-item-page.component.css']
})

export class RegisterItemPageComponent implements AfterViewInit {
  @ViewChild('collapsible', { static: false }) collapsible!: ElementRef;
  @Input() formDataItem: any = {
    item: [] // Inicializa o array de items, caso não seja passado como input
  };
  errorMessage: string = '';

  ngAfterViewInit(): void {
    if (this.collapsible) {
      M.Collapsible.init(this.collapsible.nativeElement, {});
      console.log("Collapsible inicializado!");
    } else {
      console.error("Elemento collapsible não encontrado!");
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  addItem() {
    const docId = localStorage.getItem('docId'); // Recupera o ID do documento salvo

    if (!docId) {
      this.errorMessage = 'Erro: Nenhum documento associado!';
      console.error(this.errorMessage);
      return;
    }

    if (!this.formDataItem.item) {
      this.formDataItem.item = [];
    }

    const newItem = {
      item: null,
      quantityPurchased: null,
      justification: null,
      budgetHeading: null,
      priorityDegree: null,
      expectedContractStart: null,
      expectedContractTermination: null,
      remainingDeadline: null,
      totalDurationContract: null,
      estimatedValueForTheYear: null,
      estimatedContractValue: null,
      type: null,
      contractNumber: null,
      contractingMode: null,
      termsOfReference: null,
      stateOfTheProcess: null,
      sustainabilityCriteria: null,
      slp: null,
      documentId: docId
    };

    // Adiciona o item localmente para ser exibido no HTML
    this.formDataItem.item.push(newItem);
    this.cdRef.detectChanges(); // Atualiza a tela

  }


  removeItem(index: number) {
    this.formDataItem.item.splice(index, 1);
    this.cdRef.detectChanges(); // Força a atualização da tela
  }
}
