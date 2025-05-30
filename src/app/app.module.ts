import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { RegisterDocPageComponent } from './component/register-doc-page/register-doc-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterItemPageComponent } from './component/register-item-page/register-item-page.component';
import { ListComponent } from './component/list/list.component';
import { ViewDocumentComponent } from './component/view-document/view-document.component';
import { EditDocumentComponent } from './component/edit-document/edit-document.component';
import { EditItemComponent } from './component/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    RegisterDocPageComponent,
    RegisterItemPageComponent,
    ListComponent,
    ViewDocumentComponent,
    EditDocumentComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
