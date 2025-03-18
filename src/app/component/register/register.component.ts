import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    confirmPassword: '',
    userType: ''

  };
  errorMessage: string = '';  // Variável para armazenar a mensagem de erro

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Verifica se as senhas não coincidem
    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';  // Atualiza a variável de erro
      console.error(this.errorMessage);  // Exibe no console também
      return;  // Impede o envio do formulário
    }

    // Limpa a mensagem de erro se as senhas coincidirem
    this.errorMessage = '';
    console.log('Função onSubmit() foi chamada!');

    // Envia os dados para o backend
    this.http.post('http://localhost:8080/auth/register', this.formData)
      .subscribe({
        next: response => console.log('Cadastro realizado com sucesso', response),
        error: error => {
          // Verifica se o erro é um erro de login duplicado
          if (error.status === 500) {
            this.errorMessage = 'O login já está em uso. Tente outro login.';
            console.error('Erro: Login já existe');
          } else {
            this.errorMessage = 'Erro no cadastro. Tente novamente.';
            console.error('Erro no cadastro:', error);
          }
        }
      });
  }
}
