import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

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
