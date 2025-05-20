import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';


interface Item {
  item: any;
  quantityPurchased: any;
  justification: any;
  budgetHeading: any;
  priorityDegree: any;
  expectedContractStart: any;
  expectedContractTermination: any;
  remainingDeadline: any;
  totalDurationContract: any;
  estimatedValueForTheYear: any;
  estimatedContractValue: any;
  type: any;
  contractNumber: any;
  contractingMode: any;
  termsOfReference: any;
  stateOfTheProcess: any;
  sustainabilityCriteria: any;
  slp: any;
  documentId?: string;
}

@Component({
  selector: 'app-register-doc-page',
  templateUrl: './register-doc-page.component.html',
  styleUrls: ['./register-doc-page.component.css']
})
export class RegisterDocPageComponent implements OnInit {
  formData = {
    cod: '',
    competentUnit: '',
    requestingUnit: '',
    investiment: '',
    codPdm: '',
    catmat: '',
    catser: '',
    codSubClassCnae: '',
    descriptionCnae: '',
    object: '',
    numberSei: '',
    user: { id: '' },
  };

  formDataItem: { item: Item[] } = {
   item: []
  };

  errorMessage: string = '';
  isAuthenticated: boolean = false;


  constructor(
    private router: Router,
    private service: ServiceService
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem('jwtToken');
    this.isAuthenticated = !!token;

  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.isAuthenticated) {
      this.errorMessage = 'Usuário não autenticado!';
      console.error(this.errorMessage);
      return;
    }

    if (!this.formData.cod.trim()) {
      this.errorMessage = 'Formulário possui campos vazios!';
      alert('Formulário possui campos vazios!')
      console.error(this.errorMessage);
      return;
    }

    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');

    if (!token) {
      console.error('Token JWT não encontrado!');
      return;
    }

    if (!userId) {
      console.error('ID do usuário não encontrado!');
      this.errorMessage = 'Erro: ID do usuário ausente!';
      return;
    }

    this.formData.user = { id: userId };

    console.log('FormData antes de enviar:', this.formData);

    this.service.createDocument(this.formData)
      .subscribe({
        next: (response) => {
          console.log('Documento salvo:', response);

          if (response && response.id) {
            localStorage.setItem('docId', response.id);
            alert('Documento Salvo');
            this.router.navigate(['/list']);
            this.saveItems(response.id);
          }
        },
        error: (error) => {
          this.errorMessage = error.error || 'Erro ao salvar documento!';
          console.error(this.errorMessage);
        }
      });
  }

  saveItems(docId: string) {

    if (this.formDataItem.item.length === 0) {
      console.warn('Nenhum item para salvar.');
      return;
    }

    this.formDataItem.item.forEach(item => {
      item.documentId = docId;

      this.service.createItem(item)
      .subscribe({
          next: (response) => {
            console.log('Item salvo com sucesso:', response);
          },
          error: (error) => {
            console.error('Erro ao salvar item:', item, error);
          }
        });
    });
  }
}
