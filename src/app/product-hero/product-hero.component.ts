import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-hero.component.html',
  styleUrl: './product-hero.component.scss'
})
export class ProductHeroComponent {
  @Input() headerText: string = 'Your Website, Your Way';
  @Input() subheaderText: string = 'Turn your ideas into a remarkable website experience with thousands of built-in design features that are just a click away.';
  @Input() buttonText: string = 'Get Started';
  @Input() imageUrl: string = 'path-to-default-image.png';
  @Input() backgroundColor: string = '#f0f4f7';

  onButtonClick(): void {
    // Add your custom action here, e.g., navigate to another page or trigger a function.
    console.log('Button clicked!');
  }
}
