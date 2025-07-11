import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  voiceText: string;
  highlight: string;
  interactivePrompts: string[];
  keyFeatures: string[];
  duration: number;
}

interface InteractiveDemo {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  color: string;
  category: string;
  features: string[];
  demoSteps: DemoStep[];
}

@Component({
  selector: 'app-landing',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit, OnDestroy {
  websiteUrl: string = '';
  description: string = '';
  isGenerating: boolean = false;
  showSuccess: boolean = false;
  selectedExample: InteractiveDemo | null = null;
  showExampleModal: boolean = false;
  currentStep: number = 0;
  isPlaying: boolean = false;
  isPaused: boolean = false;
  currentAudio: HTMLAudioElement | null = null;
  voiceEnabled: boolean = true;
  interactionHistory: string[] = [];
  showInteractionPanel: boolean = false;
  currentHighlight: string = '';
  stepProgress: number = 0;

  // Speech synthesis tracking
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private stepProgressInterval: any = null;
  private typingInterval: any = null;

  // Typing effect for AI responses
  currentResponse: string = '';
  typingSpeed: number = 50;
  isTyping: boolean = false;

  // Demo examples with comprehensive interactive experiences
  demoExamples: InteractiveDemo[] = [
    {
      id: 'iphone',
      title: 'iPhone 15 Pro',
      description:
        'Experience the latest iPhone through voice-guided exploration of its revolutionary features',
      url: 'https://www.apple.com/iphone-15-pro/',
      image: '📱',
      color: 'from-blue-500 to-purple-600',
      category: 'Technology',
      features: [
        'Camera System',
        'A17 Pro Chip',
        'Titanium Design',
        'Action Button',
      ],
      demoSteps: [
        {
          id: 'welcome',
          title: 'Welcome to iPhone 15 Pro',
          description:
            'Let me guide you through the most advanced iPhone ever created.',
          voiceText:
            "Welcome to the iPhone 15 Pro experience! I'm here to show you the incredible innovations that make this our most powerful iPhone yet. We'll explore the revolutionary camera system, the lightning-fast A17 Pro chip, and the stunning titanium design. Feel free to ask me anything as we go!",
          highlight: 'hero-section',
          interactivePrompts: [
            'What makes this iPhone special?',
            'Tell me about the new features',
            'How is it different from iPhone 14?',
          ],
          keyFeatures: ['Titanium Build', 'A17 Pro Chip', 'Pro Camera System'],
          duration: 6000,
        },
        {
          id: 'camera',
          title: 'Revolutionary Camera System',
          description:
            'The 48MP Main camera captures stunning detail with professional-grade features.',
          voiceText:
            'The camera system is truly revolutionary. The 48MP Main camera captures incredible detail, while the new 5x Telephoto camera brings you closer to the action. Night mode has been enhanced for even better low-light photography. Want to see some sample photos or learn about the video capabilities?',
          highlight: 'camera-section',
          interactivePrompts: [
            'Show me Night mode examples',
            'How does the 5x zoom work?',
            'Tell me about video recording',
            'Compare with other phones',
          ],
          keyFeatures: [
            '48MP Main Camera',
            '5x Telephoto',
            'Night Mode',
            '4K Video',
          ],
          duration: 8000,
        },
        {
          id: 'performance',
          title: 'A17 Pro Chip Performance',
          description:
            'Console-quality gaming and incredible efficiency in the palm of your hand.',
          voiceText:
            "The A17 Pro chip is a game-changer. Built on a 3-nanometer process, it delivers console-quality gaming performance while being incredibly efficient. This means better battery life and cooler operation. It's perfect for everything from intensive gaming to professional photo editing.",
          highlight: 'performance-section',
          interactivePrompts: [
            'Show gaming benchmarks',
            'How does it improve battery life?',
            'Compare with competitors',
            'What about AI performance?',
          ],
          keyFeatures: [
            '3nm Process',
            'Console Gaming',
            'AI Performance',
            'Efficiency',
          ],
          duration: 7000,
        },
        {
          id: 'design',
          title: 'Titanium Design Excellence',
          description:
            'Aerospace-grade titanium makes it our lightest Pro model ever.',
          voiceText:
            "The titanium design isn't just beautiful—it's incredibly strong and lightweight. We use the same grade of titanium found in spacecraft. This makes the iPhone 15 Pro our lightest Pro model ever, while being more durable than ever before. The brushed finish feels amazing in your hand.",
          highlight: 'design-section',
          interactivePrompts: [
            'Show all color options',
            'How strong is titanium?',
            'Weight comparison with other models',
            'Tell me about the Action Button',
          ],
          keyFeatures: [
            'Aerospace Titanium',
            'Lightest Pro Ever',
            'Action Button',
            '4 Colors',
          ],
          duration: 6000,
        },
        {
          id: 'action-button',
          title: 'Customizable Action Button',
          description:
            'Replace the mute switch with a programmable Action Button for quick access to your favorite features.',
          voiceText:
            "The new Action Button replaces the traditional mute switch with something much more powerful. You can customize it to launch your camera, turn on your flashlight, start a voice memo, or even run shortcuts. It's completely programmable to match how you use your iPhone.",
          highlight: 'action-button-section',
          interactivePrompts: [
            'What can I program it to do?',
            'Show me customization options',
            'How is it different from mute switch?',
            'Can it control third-party apps?',
          ],
          keyFeatures: [
            'Programmable',
            'Quick Access',
            'Customizable',
            'Shortcuts',
          ],
          duration: 5000,
        },
      ],
    },
    {
      id: 'tesla',
      title: 'Tesla Model S',
      description:
        "Discover the future of automotive technology with Tesla's flagship sedan",
      url: 'https://www.tesla.com/models',
      image: '🚗',
      color: 'from-red-500 to-orange-500',
      category: 'Automotive',
      features: [
        'Autopilot',
        'Ludicrous Mode',
        'Over-the-Air Updates',
        '405 Mile Range',
      ],
      demoSteps: [
        {
          id: 'welcome',
          title: 'Tesla Model S Experience',
          description: 'Welcome to the future of automotive technology.',
          voiceText:
            "Welcome to the Tesla Model S experience! This isn't just a car—it's a computer on wheels that gets better over time. Let me show you the incredible technology, performance, and innovation that makes Tesla the leader in electric vehicles.",
          highlight: 'hero-section',
          interactivePrompts: [
            'What makes Tesla special?',
            'Tell me about electric performance',
            'How does Autopilot work?',
          ],
          keyFeatures: [
            'Electric Performance',
            'Autopilot',
            'Over-the-Air Updates',
          ],
          duration: 6000,
        },
        {
          id: 'performance',
          title: 'Ludicrous Performance',
          description: 'Experience acceleration that rivals supercars.',
          voiceText:
            "The Model S Plaid can accelerate from 0 to 60 mph in just 1.99 seconds. That's faster than most supercars! The tri-motor setup delivers over 1,000 horsepower while maintaining incredible efficiency. The experience is unlike anything else on the road.",
          highlight: 'performance-section',
          interactivePrompts: [
            'Show acceleration videos',
            'Compare with supercars',
            'How does tri-motor work?',
            'What about track performance?',
          ],
          keyFeatures: [
            '0-60 in 1.99s',
            '1,000+ HP',
            'Tri-Motor',
            'Track Mode',
          ],
          duration: 7000,
        },
      ],
    },
    {
      id: 'airbnb',
      title: 'Luxury Bali Villa',
      description:
        'Virtual tour of a breathtaking tropical paradise with world-class amenities',
      url: 'https://airbnb.com/rooms/luxury-bali-villa',
      image: '🏖️',
      color: 'from-teal-500 to-blue-600',
      category: 'Travel',
      features: ['Infinity Pool', 'Ocean Views', 'Private Chef', 'Yoga Studio'],
      demoSteps: [
        {
          id: 'welcome',
          title: 'Tropical Paradise Welcome',
          description: 'Welcome to your private sanctuary in Bali.',
          voiceText:
            'Welcome to Villa Serenity, your private tropical paradise in Bali. This luxury villa offers breathtaking ocean views, world-class amenities, and the perfect blend of traditional Balinese architecture with modern luxury. Let me take you on a virtual tour of this incredible property.',
          highlight: 'hero-section',
          interactivePrompts: [
            'Show me the ocean views',
            'Tell me about the amenities',
            'What makes this villa special?',
          ],
          keyFeatures: ['Ocean Views', 'Private Villa', 'Luxury Amenities'],
          duration: 6000,
        },
      ],
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.initializeAnimations();
    this.setupKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.stopAudio();
    this.clearAllIntervals();
  }

  async onGenerateGuide(): Promise<void> {
    if (this.websiteUrl && this.description) {
      this.isGenerating = true;
      this.showSuccess = false;

      // Enhanced processing simulation with progress
      const processingSteps = [
        'Analyzing website structure...',
        'Extracting key features...',
        'Generating voice narration...',
        'Creating interactive elements...',
        'Optimizing user experience...',
      ];

      for (let i = 0; i < processingSteps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        // You could emit progress updates here
      }

      this.isGenerating = false;
      this.showSuccess = true;
      this.addInteraction(
        'System',
        'Interactive guide generated successfully! 🎉'
      );

      // Auto-hide success message
      setTimeout(() => {
        this.showSuccess = false;
      }, 4000);
    }
  }

  selectExample(example: InteractiveDemo): void {
    this.selectedExample = example;
    this.websiteUrl = example.url;
    this.description = example.description;
    this.showExampleModal = true;
    this.currentStep = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.stepProgress = 0;
    this.interactionHistory = [];
    this.showInteractionPanel = true;
    this.addInteraction(
      'System',
      `Starting ${example.title} interactive demo...`
    );
  }

  closeModal(): void {
    this.stopAudio();
    this.clearAllIntervals();
    this.showExampleModal = false;
    this.selectedExample = null;
    this.currentStep = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.stepProgress = 0;
    this.showInteractionPanel = false;
    this.interactionHistory = [];
    this.currentHighlight = '';
    this.currentResponse = '';
    this.isTyping = false;
  }

  async startDemo(): Promise<void> {
    if (this.selectedExample) {
      this.isPlaying = true;
      this.isPaused = false;
      this.currentStep = 0;
      this.addInteraction('AI Guide', 'Starting your interactive tour...');
      await this.playStep();
    }
  }

  async playStep(): Promise<void> {
    if (
      !this.selectedExample ||
      this.currentStep >= this.selectedExample.demoSteps.length
    ) {
      this.completeDemoTour();
      return;
    }

    const step = this.selectedExample.demoSteps[this.currentStep];
    this.currentHighlight = step.highlight;
    this.stepProgress = 0;

    // Add step introduction to interaction history
    this.addInteraction('AI Guide', `${step.title}: ${step.description}`);

    // Simulate voice narration with text animation
    if (this.voiceEnabled) {
      await this.animateVoiceText(step.voiceText);
    }

    // Check if still playing after voice animation
    if (!this.isPlaying || this.isPaused) {
      return;
    }

    // Simulate step duration with progress
    await this.animateStepProgress(step.duration);

    // Auto-advance to next step if not paused
    if (this.isPlaying && !this.isPaused) {
      this.currentStep++;
      if (this.currentStep < this.selectedExample.demoSteps.length) {
        await this.playStep();
      } else {
        this.completeDemoTour();
      }
    }
  }

  pauseDemo(): void {
    this.isPaused = true;
    this.stopAudio();
    this.addInteraction('System', 'Demo paused. Click resume to continue.');
  }

  resumeDemo(): void {
    this.isPaused = false;
    this.playStep();
  }

  stopDemo(): void {
    this.isPlaying = false;
    this.isPaused = false;
    this.stopAudio();
    this.clearAllIntervals();
    this.currentStep = 0;
    this.stepProgress = 0;
    this.currentHighlight = '';
    this.currentResponse = '';
    this.isTyping = false;
    this.addInteraction('System', 'Demo stopped. Click start to begin again.');
  }

  jumpToStep(stepIndex: number): void {
    this.currentStep = stepIndex;
    this.stepProgress = 0;
    this.stopAudio(); // Stop any current audio
    if (this.isPlaying) {
      this.playStep();
    }
  }

  async handleInteractivePrompt(prompt: string): Promise<void> {
    this.addInteraction('You', prompt);

    // Simulate AI processing
    this.isTyping = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate contextual response based on current step and prompt
    const response = this.generateAIResponse(prompt);
    await this.typeResponse(response);
    this.isTyping = false;
  }

  toggleVoice(): void {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled) {
      this.stopAudio();
    }
    this.addInteraction(
      'System',
      `Voice ${this.voiceEnabled ? 'enabled' : 'disabled'}`
    );
  }

  toggleInteractionPanel(): void {
    this.showInteractionPanel = !this.showInteractionPanel;
  }

  private async animateVoiceText(text: string): Promise<void> {
    return new Promise((resolve) => {
      // Stop any existing speech
      this.stopAudio();

      // Animate text typing
      let index = 0;
      this.currentResponse = '';

      this.typingInterval = setInterval(() => {
        if (index < text.length && this.isPlaying && !this.isPaused) {
          this.currentResponse += text[index];
          index++;
        } else {
          clearInterval(this.typingInterval);
          this.typingInterval = null;
        }
      }, this.typingSpeed);

      // Speak the text using browser TTS if voice is enabled
      if (
        this.voiceEnabled &&
        typeof window !== 'undefined' &&
        'speechSynthesis' in window
      ) {
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.rate = 1;
        this.currentUtterance.pitch = 1;
        this.currentUtterance.volume = 1;

        this.currentUtterance.onend = () => {
          this.currentUtterance = null;
          resolve();
        };

        this.currentUtterance.onerror = () => {
          this.currentUtterance = null;
          resolve();
        };

        // Check if demo is still playing before speaking
        if (this.isPlaying && !this.isPaused) {
          window.speechSynthesis.speak(this.currentUtterance);
        } else {
          resolve();
        }
      } else {
        // If voice is disabled or not supported, resolve after typing animation
        setTimeout(() => {
          resolve();
        }, text.length * this.typingSpeed + 1000);
      }
    });
  }

  getTimeStamp(index: number): string {
    const now = new Date();
    const minutesAgo = this.interactionHistory.length - index;
    const timestamp = new Date(now.getTime() - minutesAgo * 30000);

    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  clearHistory(): void {
    this.interactionHistory = [];
    this.addInteraction('System', 'Interaction history cleared.');
  }

  private async animateStepProgress(duration: number): Promise<void> {
    return new Promise((resolve) => {
      let progress = 0;
      this.stepProgressInterval = setInterval(() => {
        if (progress < 100 && this.isPlaying && !this.isPaused) {
          progress += 2;
          this.stepProgress = progress;
        } else {
          clearInterval(this.stepProgressInterval);
          this.stepProgressInterval = null;
          resolve();
        }
      }, duration / 50);
    });
  }

  private async typeResponse(response: string): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      let currentText = '';

      // Add initial empty response
      this.addInteraction('AI Guide', '');

      const interval = setInterval(() => {
        if (index < response.length) {
          currentText += response[index];
          // Update the last interaction with the growing text
          if (this.interactionHistory.length > 0) {
            this.interactionHistory[
              this.interactionHistory.length - 1
            ] = `AI Guide: ${currentText}`;
          }
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, this.typingSpeed);
    });
  }

  private generateAIResponse(prompt: string): string {
    if (!this.selectedExample) return "I'm here to help with your questions!";

    const currentStepData = this.selectedExample.demoSteps[this.currentStep];
    const lowerPrompt = prompt.toLowerCase();

    // Context-aware responses based on current step and prompt
    if (this.selectedExample.id === 'iphone') {
      if (lowerPrompt.includes('night mode')) {
        return 'Night mode on iPhone 15 Pro uses advanced computational photography to capture stunning low-light photos. The larger sensor captures more light, while the A17 Pro chip processes the image to reduce noise and enhance details. It automatically activates in low-light conditions, but you can also manually control it for creative shots.';
      }
      if (lowerPrompt.includes('zoom') || lowerPrompt.includes('5x')) {
        return 'The 5x Telephoto camera uses a tetraprism design to fold the light path, allowing for 5x optical zoom in a compact form factor. This gives you incredible reach for portraits, wildlife, and distant subjects while maintaining excellent image quality. You can also use it for macro photography!';
      }
      if (lowerPrompt.includes('battery') || lowerPrompt.includes('life')) {
        return "The A17 Pro chip's 3nm process technology delivers up to 20% better power efficiency compared to the previous generation. Combined with iOS optimizations, you can expect all-day battery life with typical use, including up to 29 hours of video playback.";
      }
      if (lowerPrompt.includes('action button')) {
        return 'The Action Button is completely customizable! You can set it to launch Camera, Flashlight, Voice Memos, Focus modes, Translate, or even run custom Shortcuts. Long press and hold to activate, and you can change its function anytime in Settings.';
      }
    }

    // Generic contextual responses
    if (lowerPrompt.includes('price') || lowerPrompt.includes('cost')) {
      return `The ${this.selectedExample.title} offers exceptional value for its premium features. I can show you different configuration options and help you find the best choice for your needs.`;
    }

    if (lowerPrompt.includes('compare') || lowerPrompt.includes('vs')) {
      return `Great question! The ${this.selectedExample.title} stands out from competitors with its unique combination of features. Let me highlight the key differentiators that make it special.`;
    }

    return `That's a great question about ${currentStepData.title}! The ${this.selectedExample.title} excels in this area. Would you like me to dive deeper into any specific aspect?`;
  }

  private completeDemoTour(): void {
    this.isPlaying = false;
    this.stepProgress = 100;
    this.addInteraction(
      'AI Guide',
      `🎉 Congratulations! You've completed the ${this.selectedExample?.title} interactive tour. Feel free to explore more or ask any questions about what you've seen.`
    );
  }

  private addInteraction(sender: string, message: string): void {
    this.interactionHistory.push(`${sender}: ${message}`);
    // Keep only last 20 interactions to prevent memory issues
    if (this.interactionHistory.length > 20) {
      this.interactionHistory.shift();
    }
  }

  private stopAudio(): void {
    // Stop HTML Audio elements
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    // Stop Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Clear current utterance reference
    this.currentUtterance = null;
  }

  private clearAllIntervals(): void {
    if (this.stepProgressInterval) {
      clearInterval(this.stepProgressInterval);
      this.stepProgressInterval = null;
    }

    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private setupKeyboardShortcuts(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    document.addEventListener('keydown', (e) => {
      if (this.showExampleModal) {
        switch (e.key) {
          case ' ':
            e.preventDefault();
            if (this.isPlaying) {
              this.isPaused ? this.resumeDemo() : this.pauseDemo();
            } else {
              this.startDemo();
            }
            break;
          case 'Escape':
            this.closeModal();
            break;
          case 'ArrowLeft':
            if (this.currentStep > 0) {
              this.jumpToStep(this.currentStep - 1);
            }
            break;
          case 'ArrowRight':
            if (
              this.selectedExample &&
              this.currentStep < this.selectedExample.demoSteps.length - 1
            ) {
              this.jumpToStep(this.currentStep + 1);
            }
            break;
        }
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initializeAnimations(): void {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    });

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });
  }

  // Component data (existing)
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

  navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Demo', href: '#demo' },
  ];

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

  startOnboarding() {
    this.router.navigate(['onboarding']);
  }
}
