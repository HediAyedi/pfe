import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DraganddropComponent} from './pages/draganddrop/draganddrop.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CvComponent} from './pages/cv/cv.component';
import {FormComponent} from './pages/form/form.component';
import {TableDesSocieteComponent} from './pages/table-des-societe/table-des-societe.component';
import {FormsocieteComponent} from './pages/formsociete/formsociete.component';
import {FormCandidatComponent} from './pages/form-candidat/form-candidat.component';
import {TableDesCandidatsComponent} from './pages/table-des-candidats/table-des-candidats.component';
import {SocieteCardsComponent} from './pages/societe-cards/societe-cards.component';
import {CarouselSocieteComponent} from './parts/carousel-societe/carousel-societe.component';
import {OffresComponent} from './pages/offres/offres.component';
import { OffreComponent } from './pages/offres/offre/offre.component';
import {NavbarComponent} from './parts/navbar/navbar.component';
import {ContactComponent} from './parts/contact/contact.component';
import {BlogFormComponent} from './pages/blog-form/blog-form.component';

const routes: Routes = [
  {path: 'draganddrop', component: DraganddropComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'cv', component: CvComponent},
  {path: 'form', component: FormComponent},
  {path: 'table/employeurs', component: TableDesSocieteComponent},
  {path: 'societe', component: FormsocieteComponent},
  {path: 'candidat', component: FormCandidatComponent},
  {path: 'table/candidats', component: TableDesCandidatsComponent},
  {path: 'cards/employeurs', component: SocieteCardsComponent},
  {path: 'carousel', component: CarouselSocieteComponent},
  {path: 'offres', component: OffresComponent},
  {path: 'offre/:offre_id', component: OffreComponent},
  {path: 'test', component: NavbarComponent},
  {path: 'contact-us', component: ContactComponent},
  {path: 'blog/form', component: BlogFormComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
