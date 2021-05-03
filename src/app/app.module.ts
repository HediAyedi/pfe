import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DraganddropComponent} from './pages/draganddrop/draganddrop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CvComponent} from './pages/cv/cv.component';
import {FormComponent} from './pages/form/form.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CardModule} from 'primeng/card';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {LoginComponent} from './parts/login/login.component';
import {NavbarComponent} from './parts/navbar/navbar.component';
import {TableDesSocieteComponent} from './pages/table-des-societe/table-des-societe.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {HttpClientModule} from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ProductService} from './pages/table-des-societe/productservice';
import {TableModule} from 'primeng/table';
import { FormsocieteComponent } from './pages/formsociete/formsociete.component';
import {RippleModule} from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import {PasswordModule} from 'primeng/password';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import { FormCandidatComponent } from './pages/form-candidat/form-candidat.component';
import { TableDesCandidatsComponent } from './pages/table-des-candidats/table-des-candidats.component';
import { SocieteCardsComponent } from './pages/societe-cards/societe-cards.component';
import { CarouselSocieteComponent } from './parts/carousel-societe/carousel-societe.component';
import {CarouselModule} from 'primeng/carousel';
import {MenubarModule} from 'primeng/menubar';
import { OfficialNavAndSearchComponent } from './parts/official-nav-and-search/official-nav-and-search.component';
import {SplitButtonModule} from 'primeng/splitbutton';

// import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import {ConfirmationService} from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    DraganddropComponent,
    DashboardComponent,
    CvComponent,
    FormComponent,
    LoginComponent,
    NavbarComponent,
    TableDesSocieteComponent,
    FormsocieteComponent,
    FormCandidatComponent,
    TableDesCandidatsComponent,
    SocieteCardsComponent,
    CarouselSocieteComponent,
    OfficialNavAndSearchComponent
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
    FormsModule,
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
    SplitButtonModule
    // ConfirmDialogModule,
    // ConfirmationService
  ],
  providers: [ProductService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
