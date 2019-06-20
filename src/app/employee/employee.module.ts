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
import { GenderPipePipe } from './gender-pipe.pipe';
import { JobTypePipe } from './job-type.pipe';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [EmployeeComponent, SearchComponent, TableEmployeeComponent, GenderPipePipe, JobTypePipe],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DropdownModule,
    RadioButtonModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule
  ],
  exports: [EmployeeComponent, SearchComponent]
})
export class EmployeeModule {}
