import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';

// Router
import * as router from '@angular/router';
import { EmployeeModule } from './employee/employee.module';
import { InsertComponent } from './employee/insert/insert.component';
import { EditComponent } from './employee/edit/edit.component';

// config route
const routes: router.Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/add', component: InsertComponent },
  { path: 'employee/edit/:employeeId', component: EditComponent },
  { path: '**', component: EmployeeComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    router.RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    EmployeeModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
