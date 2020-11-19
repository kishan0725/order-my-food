import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';

const routes: Routes = [
  { path:'', redirectTo: '/hotels', pathMatch: 'full'},
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
