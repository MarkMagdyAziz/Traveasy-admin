import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogginComponent } from './components/loggin/loggin.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FlightsComponent } from './components/flights/flights.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { TourguidComponent } from './components/tourguid/tourguid.component';
import { BodyComponent } from './components/body/body.component';

@NgModule({
  declarations: [AppComponent, LogginComponent, RegisterComponent, DashboardComponent, SidebarComponent, UsersComponent, HotelsComponent, FlightsComponent, HolidayComponent, TourguidComponent, BodyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
