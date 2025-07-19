import { Routes } from '@angular/router';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { BusResultsComponent } from './components/bus-results/bus-results.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { ScrollShowcaseComponent } from './components/product-showcase/product-showcase.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { CancelTicketComponent } from './components/cancel-ticket/cancel-ticket.component';

import { OffersPageComponent } from './components/offers-page/offers-page.component';



export const routes: Routes = [
  { path: '', component: HomeSectionComponent },
  { path: 'about', component: AboutSectionComponent },
  { path: 'results', component: BusResultsComponent },
  { path: 'seats', component: SeatSelectionComponent },
  { path: 'product-showcase', component: ScrollShowcaseComponent },
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'cancel-ticket', component:CancelTicketComponent},
  {path:'offers',component:OffersPageComponent},
];
