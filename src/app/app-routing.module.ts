import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedHolidaysComponent } from './components/booked-holidays/booked-holidays.component';
import { BookedHotelsComponent } from './components/booked-hotels/booked-hotels.component';
import { CityComponent } from './components/city/city.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlightsComponent } from './components/flights/flights.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LogginComponent } from './components/loggin/loggin.component';
import { RegisterComponent } from './components/register/register.component';
import { TourguidComponent } from './components/tourguid/tourguid.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [

  {path:"register" , component:RegisterComponent},
  {path:"login" , component:LogginComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"hotel", component:HotelsComponent},
  {path:"users", component:UsersComponent},
  {path:"flight", component:FlightsComponent},
  {path:"holiday", component:HolidayComponent},
  {path:"tourguid", component:TourguidComponent},
  {path: "bookedHotel", component:BookedHotelsComponent },
  {path: "bookedHoliday", component:BookedHolidaysComponent },
  {path: "city", component:CityComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
