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
import { AuthGuardGuard } from './helpers/auth-guard.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'hotel', component: HotelsComponent, canActivate: [AuthGuardGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'flight',
    component: FlightsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'tourguid',
    component: TourguidComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'bookedHotel',
    component: BookedHotelsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'bookedHoliday',
    component: BookedHolidaysComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'city', component: CityComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
