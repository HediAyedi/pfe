import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/employeur/home/home.component';
import { HomeCandidatComponent } from './pages/candidat/home-candidat/home-candidat.component';

import { CvComponent } from './pages/cv/cv.component';
import { GestionCvComponent } from './pages/gestion-cv/gestion-cv.component';
import { GestionExperienceComponent } from './pages/gestion-cv/gestion-experience/gestion-experience.component';
import { GestionPersonalInfoComponent } from './pages/gestion-cv/gestion-personal-info/gestion-personal-info.component';
import { GestionProfessionalInfoComponent } from './pages/gestion-cv/gestion-professional-info/gestion-professional-info.component';

import { TableDesSocieteComponent } from './pages/table-des-societe/table-des-societe.component';
import { FormsocieteComponent } from './pages/formsociete/formsociete.component';
import { FormCandidatComponent } from './pages/form-candidat/form-candidat.component';

import { TableDesCandidatsComponent } from './pages/table-des-candidats/table-des-candidats.component';

import { SocieteCardsComponent } from './pages/societe-cards/societe-cards.component';
import { CarouselSocieteComponent } from './parts/carousel-societe/carousel-societe.component';

import { OffresComponent } from './pages/offres/offres.component';
import { OffreComponent } from './pages/offres/offre/offre.component';


import { LoginEmployeurComponent } from './parts/logins/login-employeur/login-employeur.component';
import { LoginCandidatComponent } from './parts/logins/login-candidat/login-candidat.component';
import { BlogFormComponent } from './pages/blog-form/blog-form.component';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { ContactComponent } from './parts/contact/contact.component';
import { OffresEmployeurComponent } from './pages/employeur/offres-employeur/offres-employeur.component';
import { ProfileEmployeurComponent } from './pages/employeur/profile-employeur/profile-employeur.component';
import { QuizzComponent } from './quizz/quizz.component';
import { TestsComponent } from './admin/tests/tests.component';
import {HomeWebComponent} from './pages/home-web/home-web.component';
import { CandidaturesComponent } from './pages/employeur/candidatures/candidatures.component';

const routes: Routes = [


  {path: '', component: HomeWebComponent},

  { path: 'cv', component: CvComponent },
  {
    path: 'gestion-cv',
    component: GestionCvComponent,
    children: [
      { path: 'personal/:cv_id', component: GestionPersonalInfoComponent },
      { path: 'professional/:cv_id', component: GestionProfessionalInfoComponent },
      { path: 'experiences/:cv_id', component: GestionExperienceComponent },
    ],
  },

  { path: 'SignUpEmployeur', component: FormsocieteComponent },
  { path: 'SignUpCandidat', component: FormCandidatComponent },

  { path: 'admin', redirectTo:'admin/dashboard'},
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/tableEmployeurs', component: TableDesSocieteComponent },
  { path: 'admin/tableCandidats', component: TableDesCandidatsComponent },
  { path: 'admin/blog/form', component: BlogFormComponent },
  { path: 'admin/blog/home', component: BlogHomeComponent },
  { path: 'admin/tests/home', component: TestsComponent },


  {path: 'cardsEmployeurs', component: SocieteCardsComponent},
  {path: 'carousel', component: CarouselSocieteComponent},

  {path: 'offres', component: OffresComponent},
  {path: 'offres/:employeur_id', component: OffresComponent},
  {path: 'offre/:offre_id', component: OffreComponent},


  { path: 'loginEmployeur', component: LoginEmployeurComponent },
  { path: 'loginCandidat', component: LoginCandidatComponent },

  { path: 'candidat/home', component: HomeCandidatComponent },

  {path: 'employeur/home', component: HomeComponent},
  {path: 'employeur/offres', component: OffresEmployeurComponent},
  {path: 'employeur/offres/:offre_id/candidatures', component: CandidaturesComponent},
  {path: 'employeur/profil', component: ProfileEmployeurComponent},


  {path: 'contact-us', component: ContactComponent},
  {path: 'blog', component: BlogHomeComponent},

  {path: 'quizz', component: QuizzComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
