import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { AddDoctorComponent } from "../components/add-doctor/add-doctor.component";
import { ListDoctorsComponent } from "../components/list-doctors/list-doctors.component";
import { DeleteDoctorComponent } from "../components/delete-doctor/delete-doctor.component";
import { UpdateDoctorComponent } from "../components/update-doctor/update-doctor.component";

const routes: Routes = [
  { path: "/", component: AppComponent },
  { path: "list", component: ListDoctorsComponent },
  { path: "add", component: AddDoctorComponent },
  { path: "delete", component: DeleteDoctorComponent },
  { path: "update", component: UpdateDoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
