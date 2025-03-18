import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as M from 'materialize-css';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('mobile') sideNav!: ElementRef;
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav.nativeElement);
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.isAuthenticated = false;
    this.router.navigate(['/login']).then(() => {
      window.location.reload();  // Garante que a navbar some
    });
  }
}
