import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PricingComponent } from './pricing/pricing.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'pricing', component: PricingComponent }
];