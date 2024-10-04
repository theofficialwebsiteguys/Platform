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
      question: 'How long will it take to build my website?',
      answer: 'We tailor each website project to meet your specific needs. The timeline can vary based on the complexity and features of your site, but we work efficiently while maintaining close communication to ensure a smooth process. A typical website can take anywhere from a few days to a few weeks, depending on the project scope and business owner preparation.',
      open: false
    },
    {
      question: 'What are the costs involved in creating a website?',
      answer: 'The cost of building a website depends on several factors, such as the number of pages, functionality, and custom features. We offer various packages to suit different needs, from simple one-page websites to fully functional e-commerce stores.',
      open: false
    },
    {
      question: 'Will my website appear on the first page of Google?',
      answer: 'Not at all. We provide ongoing support and maintenance services by expert software developers to handle everything for you.',
      open: false
    },
    {
      question: 'Do I need to know how to code to manage my website?',
      answer: 'Getting to the first page of Google requires strategic effort over time. We offer SEO services that help improve your site’s visibility in search results. While no one can guarantee a first-page ranking immediately, our team works diligently to optimize your website for search engines, helping your business climb the ranks.',
      open: false
    },
    {
      question: 'Can I make updates to my website after it’s launched?',
      answer: 'Yes, absolutely. The Website Guys will be by your side to update and change anything as needed. Whether it’s minor adjustments or more complex updates, we’re here to ensure your site continues to grow and evolve with your business.',
      open: false
    }
  ];


  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
