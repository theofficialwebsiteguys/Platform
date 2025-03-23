import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-platform-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './platform-nav.component.html',
  styleUrl: './platform-nav.component.scss'
})
export class PlatformNavComponent {

}

