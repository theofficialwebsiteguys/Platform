import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { WebsitePackagesComponent } from './website-packages/website-packages.component';
import { SeoMarketingComponent } from './seo-marketing/seo-marketing.component';
import { DevelopmentComponent } from './development/development.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MissionComponent } from './mission/mission.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    { path: 'Platfrom/pricing', component: PricingComponent },
    { path: 'Platfrom/sign-up', component: SignUpComponent },
    { path: 'Platfrom/login', component: LoginComponent },
    { path: 'Platfrom/mission', component: MissionComponent },
    { path: 'Platfrom/contact', component: ContactComponent },
    { path: 'Platfrom/products/websites', component: WebsitePackagesComponent },
    { path: 'Platfrom/products/seo-marketing', component: SeoMarketingComponent },
    { path: 'Platfrom/products/development', component: DevelopmentComponent },
    { path: 'Platfrom/products/analytics', component: AnalyticsComponent },
];