import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    { path: 'landing', component: LandingComponent }
];