import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PlansComponent } from './plans/plans.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    { path: 'home', pathMatch: 'full', component: LandingComponent },
    { path: 'plans', pathMatch: 'full', component: PlansComponent },
    { path: 'thank-you', component: ThankYouComponent }
];