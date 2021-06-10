import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitterModule } from 'primeng/splitter';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChipsModule } from 'primeng/chips';
import { EditorModule } from 'primeng/editor';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    BreadcrumbModule,
    CardModule,
    ToastModule,
    StepsModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FieldsetModule,
    SplitterModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    RippleModule,
    DialogModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    TooltipModule,
    ContextMenuModule,
    DropdownModule,
    PasswordModule,
    InputMaskModule,
    KeyFilterModule,
    CarouselModule,
    MenubarModule,
    SplitButtonModule,
    DataViewModule,
    TabMenuModule,
    OverlayPanelModule,
    CascadeSelectModule,
    SidebarModule,
    InputSwitchModule,
    PanelModule,
    PaginatorModule,
    ChartModule,
    ScrollPanelModule,
    ChipsModule,
    EditorModule,

    ColorPickerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    AngularEditorModule,

    // ConfirmDialogModule,
    // ConfirmationService
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
