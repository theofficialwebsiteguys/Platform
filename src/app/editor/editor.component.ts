import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  editorFlex: string = '0.3';
  previewFlex: string = '0.7';

  pages = ['Home', 'About', 'Contact', 'Services'];
  colorScheme = { primary: '#333333', secondary: '#ffffff' };
  content = '';
  generatedTemplate = 'https://your-template-url.com'; // Replace with dynamic preview URL

  // Expand or shrink the editor
  toggleExpand() {
    if (this.editorFlex === '1') {
      // Reset to default sizes
      this.editorFlex = '0.3';
      this.previewFlex = '0.7';
    } else {
      // Expand editor to full width
      this.editorFlex = '1';
      this.previewFlex = '0';
    }
  }

  selectPage(event: Event) {
    const selectedPage = (event.target as HTMLSelectElement).value;
    console.log('Selected page:', selectedPage);
    // Logic to load content/settings for the selected page
  }
}
