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
    question: "How long does it take to build a website?",
    answer: "That depends on the complexity, features, and how quickly you provide assets (content, images, feedback). A basic site might take 1–3 weeks, while more advanced/eCommerce sites often take 4–8+ weeks. We maintain clear milestones and keep you updated at every step.",
    open: false
  },
  {
    question: "How much does it cost to build a website?",
    answer: "Our website pricing depends on the number of pages, features, and level of customization. Single-page websites start at $500+, while multi-page builds typically start at $1,000+. The final cost depends on the functionality you need — such as eCommerce, memberships, or custom integrations. We offer tiered packages (Starter, Growth, and Custom) and provide a detailed quote after reviewing your goals and requirements.",
    open: false
  },
  {
    question: "Which industries or niches do you work with?",
    answer: "We help businesses across industries — service providers, eCommerce, local businesses, SaaS/startups, creatives, and more. We enjoy tailoring the solution to your industry’s unique needs.",
    open: false
  },
  {
    question: "Will my website automatically appear on Google’s first page?",
    answer: "No, we can’t guarantee first-page placement immediately — search rankings depend on competition, keyword difficulty, ongoing SEO work, and time. However, we will optimize your site (SEO fundamentals, content, technical setup) to give you the best chance to rank. With consistent effort, many clients see significant improvements in 3–6 months.",
    open: false
  },
  {
    question: "Do I need to know how to code to manage my website?",
    answer: "No coding skills are required. We build the site with an easy content management system (CMS), and we provide training, documentation, and ongoing support so you can make updates (or we can do them for you).",
    open: false
  },
  {
    question: "Can I make updates to my website after launch?",
    answer: "Absolutely. We offer post-launch maintenance and update services. Whether you want minor text/image edits or entirely new pages/features, we’re here to support you.",
    open: false
  },
  {
    question: "What do I need to provide to get started?",
    answer: "At the start, we’ll ask for your branding assets (logo, colors, fonts), content (text, images), examples of sites you like, and key goals or features you want. The more detail you provide early, the smoother the process.",
    open: false
  },
  {
    question: "Which platforms or CMS do you build on?",
    answer: "We build on flexible, industry-standard platforms like WordPress, Shopify, Webflow, or custom frameworks depending on your needs. Each has pros and cons — we’ll recommend what fits best for your project.",
    open: false
  },
  {
    question: "Will my website be mobile-friendly and fast loading?",
    answer: "Yes — every site we build is responsive (adapts to mobile, tablet, desktop) and optimized for speed, performance, and SEO best practices (image compression, caching, code minification).",
    open: false
  },
  {
    question: "What ongoing support, maintenance or hosting do you offer?",
    answer: "We offer maintenance plans covering updates, backups, security monitoring, bug fixes, and help with content changes. We can also host your site or guide you with hosting setup.",
    open: false
  }
]



  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
