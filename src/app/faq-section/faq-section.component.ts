import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {
  faqs = [
    {
      question: 'What is website development?',
      answer: 'Website development refers to the process of creating, building, and maintaining a website. It includes everything from web design to coding, content creation, and website management.',
      open: false
    },
    {
      question: 'How long does it take to develop a website?',
      answer: 'The time it takes to develop a website varies depending on the complexity and requirements of the project. A simple website might take a few weeks, while a more complex website could take several months.',
      open: false
    },
    {
      question: 'What are the costs involved in website development?',
      answer: 'The cost of website development depends on various factors, including the complexity of the design, the number of pages, the features required, and whether you need ongoing maintenance and support.',
      open: false
    },
    {
      question: 'Do I need to know how to code to manage my website?',
      answer: 'No, you don’t need to know how to code. Most modern websites are built using content management systems (CMS) like WordPress, which allow you to manage and update your website without any coding knowledge.',
      open: false
    },
    {
      question: 'What is responsive web design?',
      answer: 'Responsive web design is an approach to web design that ensures a website looks and works well on all devices, including desktops, tablets, and smartphones. The layout adjusts automatically to fit the screen size.',
      open: false
    },
    {
      question: 'How can I improve my website’s search engine ranking?',
      answer: 'Improving your website’s search engine ranking involves optimizing your content for relevant keywords, ensuring your site is mobile-friendly, improving page load speed, and building backlinks from reputable sources.',
      open: false
    },
    {
      question: 'Can I update my website after it’s launched?',
      answer: 'Yes, you can update your website after it’s launched. Whether you want to add new content, update images, or change design elements, a CMS makes it easy to make changes without needing to rebuild the site.',
      open: false
    }
  ];


  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
