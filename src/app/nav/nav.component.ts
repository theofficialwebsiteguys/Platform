import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isScrolled = false;
  isMenuOpen = false;
  isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 50;
  }

  navigateAndScroll(id: string) {
    this.closeMenu();

    // If already on home page, just scroll
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
    if (!this.isBrowser) return;

    const el = document.getElementById(id);
    if (!el) return;

    const nav = document.querySelector('.nav-shell') as HTMLElement;
    const offset = nav?.offsetHeight || 0;

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
