import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {
  websiteUrl: string = '';
  description: string = '';
  isGenerating: boolean = false;
  showSuccess: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeAnimations();
  }

  onGenerateGuide(): void {
    if (this.websiteUrl && this.description) {
      this.isGenerating = true;

      // Simulate processing
      setTimeout(() => {
        this.isGenerating = false;
        this.showSuccess = true;

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }, 2000);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initializeAnimations(): void {
    // Initialize any complex animations or interactions here
    // This method can be expanded based on specific animation needs
  }

  // Feature data
  features = [
    {
      icon: 'lightning',
      title: 'Lightning Fast',
      description:
        'Generate interactive guides in seconds. Our AI analyzes your website and creates voice-enabled demonstrations instantly.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: 'brain',
      title: 'Smart Interaction',
      description:
        'Users can interact with your guide through voice commands and text inputs, making exploration intuitive and engaging.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: 'share',
      title: 'Multi-Modal Experience',
      description:
        'Combine visual guides with voice narration and text interaction for a complete product demonstration experience.',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  // How it works steps
  steps = [
    {
      number: 1,
      title: 'Enter URL',
      description:
        "Simply paste your website URL into DemoFlow. We'll automatically fetch and analyze your site's content and structure.",
      gradient: 'from-purple-600 to-blue-600',
    },
    {
      number: 2,
      title: 'Describe Goals',
      description:
        "Tell us what you want to showcase. Whether it's key features, user flows, or specific benefits - we'll create interactive experiences.",
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      number: 3,
      title: 'Get Interactive Guide',
      description:
        'Receive a beautiful guide that users can explore through voice, text, and visual interactions instantly.',
      gradient: 'from-cyan-600 to-green-600',
    },
  ];

  // Navigation items
  navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Demo', href: '#demo' },
  ];

  // Footer links
  footerLinks = {
    product: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Examples', href: '#' },
      { label: 'API', href: '#' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  };
}
