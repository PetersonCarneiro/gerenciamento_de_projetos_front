import { ViewDocumentComponent } from './component/view-document/view-document.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { RegisterDocPageComponent } from './component/register-doc-page/register-doc-page.component';
import { ListComponent } from './component/list/list.component';
import { EditDocumentComponent } from './component/edit-document/edit-document.component';

const routes: Routes = [
  {path:'',component: HomePageComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'register-doc', component: RegisterDocPageComponent},
  {path:'list', component: ListComponent},
  {path:'document/:id', component: ViewDocumentComponent},
  {path:'edit-document/:id', component: EditDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
