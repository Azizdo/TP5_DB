import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { AddDoctorComponent } from "../components/add-doctor/add-doctor.component";

const routes: Routes = [
  { path: "/", component: AppComponent },
  { path: "add", component: AddDoctorComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
