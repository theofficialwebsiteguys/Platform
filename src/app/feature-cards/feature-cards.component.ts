import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-cards.component.html',
  styleUrl: './feature-cards.component.scss'
})
export class FeatureCardsComponent {
  @Input() header: string = '';
  @Input() packages: { icon: string, title: string, bullets: string[] }[] = [];
  @Input() backgroundColor: string = '#000000';
  @Input() textColor: string = '#FFFFFF';
  
}
