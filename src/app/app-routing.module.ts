import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {ArtistListComponent} from "./component/artist-list/artist-list.component";
import {ArtistAddComponent} from "./component/artist-add/artist-add.component";
import {ArtistEditComponent} from "./component/artist-edit/artist-edit.component";
import {ArtistDetailComponent} from "./component/artist-detail/artist-detail.component";
import {ProgramComponent} from "./component/program/program.component";
import {ProgramEditComponent} from "./component/program-edit/program-edit.component";
import {ProgramAddComponent} from "./component/program-add/program-add.component";
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {VolunteerInformationsComponent} from "./component/volunteer-informations/volunteer-informations.component";
import {VolunteerListComponent} from "./component/volunteer-list/volunteer-list.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'artist-list', component: ArtistListComponent},
  {path: 'artist-add', component: ArtistAddComponent, canActivate: [AuthGuard]},
  {path: 'artist-detail/:id', component: ArtistDetailComponent},
  {path: 'artist-edit/:id', component: ArtistEditComponent, canActivate: [AuthGuard]},
  {path: 'program', component: ProgramComponent},
  {path: 'program-add', component: ProgramAddComponent, canActivate: [AuthGuard]},
  {path: 'program-edit/:id', component: ProgramEditComponent, canActivate: [AuthGuard]},
  {path: 'volunteer-informations', component: VolunteerInformationsComponent, canActivate: [AuthGuard]},
  {path: 'volunteer-list', component: VolunteerListComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
