import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import {AngularFireModule} from "@angular/fire"
import {AngularFireStorageModule,AngularFireStorageReference,AngularFireUploadTask} from "@angular/fire/storage"

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import { ChipsModule } from 'primeng/chips';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import { OfficialNavAndSearchComponent } from './parts/official-nav-and-search/official-nav-and-search.component';
import { BlogHomeComponent } from './pages/blog-home/blog-home.component';
import { ContactComponent } from './parts/contact/contact.component';
import { HomeWebComponent } from './pages/home-web/home-web.component';
import { SocieteCardsComponent } from './pages/societe-cards/societe-cards.component';
import { OffresComponent } from './pages/offres/offres.component';
import { OffreComponent } from './pages/offres/offre/offre.component';
import { CarouselSocieteComponent } from './parts/carousel-societe/carousel-societe.component';
import { OffreCarouselComponent } from './parts/offre-carousel/offre-carousel.component';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogFormComponent } from './pages/blog-form/blog-form.component';
import { TestsComponent } from './admin/tests/tests.component';
import { TableDesSocieteComponent } from './pages/table-des-societe/table-des-societe.component';
import { TableDesCandidatsComponent } from './pages/table-des-candidats/table-des-candidats.component';

import { FormsocieteComponent } from './pages/formsociete/formsociete.component';
import { FormCandidatComponent } from './pages/form-candidat/form-candidat.component';
import { LoginEmployeurComponent } from './parts/logins/login-employeur/login-employeur.component';
import { LoginCandidatComponent } from './parts/logins/login-candidat/login-candidat.component';

import { HomeComponent } from './pages/employeur/home/home.component';
import { ProfileEmployeurComponent } from './pages/employeur/profile-employeur/profile-employeur.component';
import { OffresEmployeurComponent } from './pages/employeur/offres-employeur/offres-employeur.component';
import { EmployeurDashboardComponent } from './pages/employeur/employeur-dashboard/employeur-dashboard.component';
import { CandidaturesComponent } from './pages/employeur/candidatures/candidatures.component';

import { HomeCandidatComponent } from './pages/candidat/home-candidat/home-candidat.component';
import { QuizzComponent } from './quizz/quizz.component';
import { GestionCvComponent } from './pages/gestion-cv/gestion-cv.component';
import { GestionExperienceComponent } from './pages/gestion-cv/gestion-experience/gestion-experience.component';
import { GestionPersonalInfoComponent } from './pages/gestion-cv/gestion-personal-info/gestion-personal-info.component';
import { GestionProfessionalInfoComponent } from './pages/gestion-cv/gestion-professional-info/gestion-professional-info.component';
import { CvComponent } from './pages/cv/cv.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { NgxImageCompressService } from 'ngx-image-compress';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CandidatProfileComponent } from './pages/candidat/candidat-profile/candidat-profile.component';
import { environment } from 'src/environments/environment';
import { CandidatComponent } from './pages/candidat/candidat.component';
import { CritiquesComponent } from './pages/candidat/critiques/critiques.component';
import { GestionProfilComponent } from './pages/candidat/gestion-profil/gestion-profil.component';

// import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import {ConfirmationService} from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CvComponent,
    TableDesSocieteComponent,
    FormsocieteComponent,
    FormCandidatComponent,
    TableDesCandidatsComponent,
    SocieteCardsComponent,
    CarouselSocieteComponent,
    OfficialNavAndSearchComponent,
    OffresComponent,
    OffreComponent,
    LoginEmployeurComponent,
    LoginCandidatComponent,
    AdminComponent,
    ContactComponent,
    BlogFormComponent,
    BlogHomeComponent,
    HomeComponent,
    ProfileEmployeurComponent,
    OffresEmployeurComponent,
    TestsComponent,
    QuizzComponent,
    HomeWebComponent,
    OffreCarouselComponent,
    GestionCvComponent,
    GestionExperienceComponent,
    GestionPersonalInfoComponent,
    GestionProfessionalInfoComponent,
    HomeCandidatComponent,
    CandidaturesComponent,
    EmployeurDashboardComponent,
    CandidatProfileComponent,
    CandidatComponent,
    CritiquesComponent,
    GestionProfilComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,

    ProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    TableModule,
    DropdownModule,
    BreadcrumbModule,
    CardModule,
    ToastModule,
    StepsModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    FieldsetModule,
    SplitterModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    RippleModule,
    SliderModule,
    MultiSelectModule,
    TooltipModule,
    ContextMenuModule,
    DropdownModule,
    PasswordModule,
    InputMaskModule,
    CarouselModule,
    MenubarModule,
    TabMenuModule,
    OverlayPanelModule,
    CascadeSelectModule,
    SidebarModule,
    InputSwitchModule,
    PanelModule,
    ChartModule,
    ScrollPanelModule,
    ScrollTopModule,
    ChipsModule,

    ColorPickerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularEditorModule,

    PdfViewerModule,
    

    // ConfirmDialogModule,
    // ConfirmationService
  ],
  providers: [MessageService, ConfirmationService,NgxImageCompressService],
  bootstrap: [AppComponent],
})
export class AppModule {}
