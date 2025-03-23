import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy {
  menuVisible = false;
  isMenuOpen = false;
  isProductsDropdownOpen = false;
  openDropdownId = '';

  private isBrowser: boolean;
  private resizeListener = this.onResize.bind(this);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  onResize() {
    if (!this.isBrowser) return;
    const width = window.innerWidth;

    if (width > 991 && this.menuVisible) {
      this.closeMenu();
    }

    if (width <= 991) {
      this.closeAllDropdowns();
    }
  }

  closeMenu() {
    this.menuVisible = false;

    if (!this.isBrowser) return;
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const body = document.body;

    fullscreenMenu?.classList.remove('show');
    this.resetBodyStyles(body);
  }

  toggleDropdownMobile(dropdownId: string, event: Event) {
    event.preventDefault();
    this.openDropdownId = this.openDropdownId === dropdownId ? '' : dropdownId;
    this.updateDropdownStates();
  }

  updateDropdownStates() {
    if (!this.isBrowser) return;
    const dropdowns = document.querySelectorAll('.dropdown-content-mobile');
    dropdowns.forEach((dropdown) => {
      if (dropdown.id === this.openDropdownId) {
        dropdown.classList.add('show');
      } else {
        dropdown.classList.remove('show');
      }
    });
  }

  toggleMenu(event: Event) {
    event.preventDefault();
    this.menuVisible = !this.menuVisible;

    if (!this.isBrowser) return;
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const body = document.body;

    if (this.menuVisible) {
      fullscreenMenu?.classList.add('show');
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.height = '100%';
      body.style.top = '0';
      body.style.left = '0';
    } else {
      fullscreenMenu?.classList.remove('show');
      this.resetBodyStyles(body);
    }
  }

  toggleDropdown(dropdownId: string, event: Event): void {
    event.preventDefault();

    if (!this.isBrowser) return;
    const dropdownElement = document.getElementById(dropdownId);
    const arrowIcon = document.getElementById(`${dropdownId}-arrow`);

    if (dropdownElement?.classList.contains('show')) {
      dropdownElement.classList.remove('show');
      arrowIcon?.classList.remove('rotate');
    } else {
      this.closeAllDropdowns();
      dropdownElement?.classList.add('show');
      arrowIcon?.classList.add('rotate');
    }
  }

  closeAllDropdowns(): void {
    if (!this.isBrowser) return;
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const arrows = document.querySelectorAll('.dropdown-arrow');

    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    arrows.forEach(arrow => arrow.classList.remove('rotate'));

    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const body = document.body;

    this.menuVisible = false;
    this.openDropdownId = '';
    this.updateDropdownStates();

    fullscreenMenu?.classList.remove('show');
    this.resetBodyStyles(body);
  }

  private resetBodyStyles(body: any) {
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
    body.style.height = '';
    body.style.top = '';
    body.style.left = '';
  }
}
