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
    question: "Is the website mockup really free?",
    answer:
      "Yes. We design a custom homepage mockup for your business before you commit to anything. You can review it and decide if you’d like to move forward — no obligation.",
    open: false
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "We’ll review your details, then reach out to clarify anything needed before creating your mockup. If you’d prefer, you can also book a quick call to talk things through.",
    open: false
  },
  {
    question: "Do I need to choose a plan upfront?",
    answer:
      "No. You don’t need to choose anything before seeing your mockup. Plans are only discussed after you’ve seen what we’d build for your business.",
    open: false
  },
  {
    question: "Are these templates or pre-built designs?",
    answer:
      "No. Every website we design is built specifically for the business — no templates, no page builders, and no reused layouts.",
    open: false
  },
  {
    question: "What types of businesses do you work with?",
    answer:
      "We primarily work with local and service-based businesses that want a clear, professional website without managing the technical side themselves.",
    open: false
  },
  {
    question: "Who will I be working with?",
    answer:
      "You’ll communicate directly with the team building your site — no sales handoffs or middlemen. The same people who design it support it.",
    open: false
  },
  {
    question: "What if I don’t like the mockup?",
    answer:
      "That’s completely fine. If it’s not the right fit, there’s no pressure to move forward. The goal is to make sure it feels right before any commitment.",
    open: false
  },
  {
    question: "Can changes be made after launch?",
    answer:
      "Yes. Once live, we can help with updates, improvements, and adjustments as your business evolves, based on what you need.",
    open: false
  },
  {
    question: "Will I own my website?",
    answer:
      "An ownership buyout option is available if you’d like full control of the site and code. We’ll explain this clearly if you decide to move forward.",
    open: false
  },
  {
    question: "Is this a long-term contract?",
    answer:
      "No long-term commitment is required upfront. Everything starts with the mockup so you can decide comfortably before moving ahead.",
    open: false
  }
];



  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80; // adjust for topbar / navbar height
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }


  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }
}
