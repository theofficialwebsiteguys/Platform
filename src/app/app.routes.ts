import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { WebsitePackagesComponent } from './website-packages/website-packages.component';
import { SeoMarketingComponent } from './seo-marketing/seo-marketing.component';
import { DevelopmentComponent } from './development/development.component';
import { MissionComponent } from './mission/mission.component';
import { ContactComponent } from './contact/contact.component';
import { PlatformComponent } from './platform/platform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { EditorComponent } from './editor/editor.component';
import { CalendlyComponent } from './calendly/calendly.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mission', component: MissionComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'confirmation', component: CalendlyComponent },
    { path: 'products/websites', component: WebsitePackagesComponent },
    { path: 'products/seo-marketing', component: SeoMarketingComponent },
    { path: 'products/development', component: DevelopmentComponent },
    { path: 'platform', component: PlatformComponent,
        children: [
            {
              path: 'dashboard',
              component: DashboardComponent
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'editor',
                component: EditorComponent
            }
          ],
     },
];