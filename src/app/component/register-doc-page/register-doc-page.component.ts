import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';

declare var M: any; // Declara Materialize globalmente

@Component({
  selector: 'app-register-doc-page',
  templateUrl: './register-doc-page.component.html',
  styleUrls: ['./register-doc-page.component.css']
})
export class RegisterDocPageComponent implements OnInit, AfterViewInit {
  @ViewChild('collapsible', { static: false }) collapsible!: ElementRef;

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
    user: {
      id: ''
    },
    items: [{
      id: '',
        item: '',
        quantityPurchased: '',
        justification: '',
        budgetHeading: '',
        priorityDegree: '',
        expectedContractStart: new Date(),
        expectedContractTermination: new Date(),
        remainingDeadline: 0,
        totalDurationContract: 0,
        estimatedValueForTheYear: 0,
        estimatedContractValue: 0,
        type: '',
        contractNumber: 0,
        contractingMode: '',
        termsOfReference: '',
        stateOfTheProcess: '',
        sustainabilityCriteria: '',
        slp: '',
        doc: null
      }]
    };



  errorMessage: string = '';
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

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
      console.error(this.errorMessage);
      return;
    }

    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId'); // Pegando o ID do usuário salvo após o login

    if (!token) {
      console.error('Token JWT não encontrado!');
      return;
    }

    if (!userId) {
      console.error('ID do usuário não encontrado!');
      this.errorMessage = 'Erro: ID do usuário ausente!';
      return;
    }

    // Garante que o user será enviado corretamente como um objeto com ID
    this.formData.user = { id: userId };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost:8080/document', this.formData, { headers })
      .subscribe({
        next: response => {
          console.log('Cadastro realizado com sucesso', response);
          alert('Cadastro realizado com sucesso!');
        },
        error: erro => {
          console.error('Erro ao cadastrar:', erro);
          this.errorMessage = 'Erro ao cadastrar o documento!';
        }
      });
  }


  ngAfterViewInit() {
    // Verifique se o collapsible foi inicializado corretamente
    if (this.collapsible?.nativeElement) {
      M.Collapsible.init(this.collapsible.nativeElement); // Inicializa o collapsible
    } else {
      console.error('Elemento collapsible não encontrado!');
    }
  }

  // Função para adicionar um novo item
  addItem() {
    this.formData.items.push({
      id: '',
      item: '',
      quantityPurchased: '',
      justification: '',
      budgetHeading: '',
      priorityDegree: '',
      expectedContractStart: new Date(),
      expectedContractTermination: new Date(),
      remainingDeadline: 0,
      totalDurationContract: 0,
      estimatedValueForTheYear: 0,
      estimatedContractValue: 0,
      type: '',
      contractNumber: 0,
      contractingMode: '',
      termsOfReference: '',
      stateOfTheProcess: '',
      sustainabilityCriteria: '',
      slp: '',
      doc: null
    });
  }

  // Função para remover um item da lista
removeItem(index: number) {
  // Remove o item da lista no índice fornecido
  this.formData.items.splice(index, 1);
}


}
