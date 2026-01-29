import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  navigateAndScroll(id: string) {
    if (!this.isBrowser) return;

    // If already on home page, scroll directly
    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollToId(id);
      return;
    }

    // Otherwise navigate to home, then scroll
    this.router.navigate(['/']).then(() => {
      setTimeout(() => this.scrollToId(id), 50);
    });
  }

  private scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const nav = document.querySelector('.nav-shell') as HTMLElement;
    const offset = nav?.offsetHeight || 80;

    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
  
}