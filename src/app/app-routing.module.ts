import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DraganddropComponent} from './pages/draganddrop/draganddrop.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CvComponent} from './pages/cv/cv.component';
import {FormComponent} from './pages/form/form.component';
import {TableDesSocieteComponent} from './pages/table-des-societe/table-des-societe.component';
import {FormsocieteComponent} from './pages/formsociete/formsociete.component';

const routes: Routes = [
  {path: 'draganddrop', component: DraganddropComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'cv', component: CvComponent},
  {path: 'form', component: FormComponent},
  {path: 'table', component: TableDesSocieteComponent},
  {path: 'societe', component: FormsocieteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
