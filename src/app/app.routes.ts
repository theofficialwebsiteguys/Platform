import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { WebsitePackagesComponent } from './website-packages/website-packages.component';
import { SeoMarketingComponent } from './seo-marketing/seo-marketing.component';
import { DevelopmentComponent } from './development/development.component';
import { AnalyticsComponent } from './analytics/analytics.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products/websites', component: WebsitePackagesComponent },
    { path: 'products/seo-marketing', component: SeoMarketingComponent },
    { path: 'products/development', component: DevelopmentComponent },
    { path: 'products/analytics', component: AnalyticsComponent },
];