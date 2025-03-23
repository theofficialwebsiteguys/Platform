import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PlatformNavComponent } from '../platform-nav/platform-nav.component';
import { RouterModule } from '@angular/router';
import { WalkthroughComponent } from '../walkthrough/walkthrough.component';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [CommonModule, DashboardComponent, PlatformNavComponent, RouterModule, WalkthroughComponent],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent {
  showWalkthrough = true; // Start with walkthrough visible

  onWalkthroughComplete(): void {
    this.showWalkthrough = false; // Hide walkthrough, show router outlet
  }
}
