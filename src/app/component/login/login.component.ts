import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit(): void {
    const loginData = {
      login: this.login,
      password: this.password
    };

    this.http.post<{ token: string, id: string }>('http://localhost:8080/auth/login', loginData)
    .subscribe({
      next: (response) => {
        console.log('Resposta da API:', response); // Verifica a resposta completa

        if (response && response.id) {
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('userId', response.id); // Acessando diretamente o id
          console.log('Login bem-sucedido');

          this.router.navigate(['/list']).then(() => {
            window.location.reload();
          });

        } else {
          this.errorMessage = 'Usuário ou ID não encontrado na resposta';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = error.error || 'Erro no login, tente novamente!';
        console.error(this.errorMessage);
      }
    });

  }
}
