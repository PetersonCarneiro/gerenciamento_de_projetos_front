import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit{
  @ViewChild('mobile') sideNav!: ElementRef;

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav.nativeElement);
  }

}
