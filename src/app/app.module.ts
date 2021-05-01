import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DraganddropComponent} from './pages/draganddrop/draganddrop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CvComponent} from './pages/cv/cv.component';
import {FormComponent} from './pages/form/form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProductService} from './pages/table-des-societe/productservice';
import {TableModule} from 'primeng/table';
import { FormsocieteComponent } from './pages/formsociete/formsociete.component';

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
    FormsocieteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    NgbModule,
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
    DialogModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    // ConfirmDialogModule,
    // ConfirmationService
  ],
  providers: [ProductService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
