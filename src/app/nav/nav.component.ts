import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnDestroy  {

  menuVisible = false;

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    const width = window.innerWidth;

    // If the screen size is larger than the mobile breakpoint and the menu is open, close it
    if (width > 991 && this.menuVisible) { 
      this.closeMenu();
    }

    // Also close any dropdowns when screen size changes
    if (width <= 991) {
      this.closeAllDropdowns();  // Close dropdowns if shrinking to mobile view
    }
  }

  closeMenu() {
    this.menuVisible = false;

    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const body = document.body;

    fullscreenMenu?.classList.remove('show');
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
    body.style.height = '';
    body.style.top = '';
    body.style.left = '';
  }

  isMenuOpen = false;
  isProductsDropdownOpen = false;
  openDropdownId = '';

  
toggleDropdownMobile(dropdownId: string, event: Event) {
  event.preventDefault();
  if (this.openDropdownId === dropdownId) {
      this.openDropdownId = ''; // Close the dropdown if it's already open
  } else {
      this.openDropdownId = dropdownId; // Open the clicked dropdown
  }
  this.updateDropdownStates();
}

updateDropdownStates() {
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
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
      body.style.top = '';
      body.style.left = '';
    }
  }


  toggleDropdown(dropdownId: string, event: Event): void {
    event.preventDefault();

    const dropdownElement = document.getElementById(dropdownId);
    const arrowIcon = document.getElementById(`${dropdownId}-arrow`);

    if (dropdownElement?.classList.contains('show')) {
      dropdownElement.classList.remove('show');
      arrowIcon?.classList.remove('rotate');  // Remove the rotation when dropdown is closed
    } else {
      this.closeAllDropdowns();
      dropdownElement?.classList.add('show');
      arrowIcon?.classList.add('rotate');  // Rotate the arrow when dropdown is opened
    }
  }

  // Close all dropdowns and reset arrows
  closeAllDropdowns(): void {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    const arrows = document.querySelectorAll('.dropdown-arrow');

    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    arrows.forEach(arrow => arrow.classList.remove('rotate')); // Reset arrow rotation
  }
}
