import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app.component';
import {HomeComponent} from './component/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {MenuComponent} from './component/menu/menu.component';
import {ArtistListComponent} from './component/artist-list/artist-list.component';
import {ArtistAddComponent} from './component/artist-add/artist-add.component';
import {ArtistEditComponent} from './component/artist-edit/artist-edit.component';
import {ArtistDetailComponent} from './component/artist-detail/artist-detail.component';
import {ProgramComponent} from './component/program/program.component';
import {ProgramAddComponent} from './component/program-add/program-add.component';
import {ProgramEditComponent} from './component/program-edit/program-edit.component';
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
import {HttpTokenInterceptor} from './interceptor/http-token.interceptor';
import { VolunteerInformationsComponent } from './component/volunteer-informations/volunteer-informations.component';
import { VolunteerListComponent } from './component/volunteer-list/volunteer-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    ProgramComponent,
    ProgramAddComponent,
    ProgramEditComponent,
    RegisterComponent,
    LoginComponent,
    VolunteerInformationsComponent,
    VolunteerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
