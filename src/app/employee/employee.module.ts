import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeComponent } from "./employee.component";
import { SearchComponent } from "./search/search.component";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { ReactiveFormsModule } from "@angular/forms";
import { TableEmployeeComponent } from "./table-employee/table-employee.component";
import { HttpClientModule } from "@angular/common/http";
import { GenderPipePipe } from './pipe/gender-pipe.pipe';
import { JobTypePipe } from './pipe/job-type.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { InsertComponent } from './insert/insert.component';
import {InputTextareaModule} from 'primeng/inputtextarea';

// confirmdialog
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [EmployeeComponent, SearchComponent, TableEmployeeComponent, GenderPipePipe, JobTypePipe,InsertComponent, EditComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DropdownModule,
    RadioButtonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule,
    RouterModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    MessageModule
  ],
  exports: [EmployeeComponent, SearchComponent, InsertComponent],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeModule { }
