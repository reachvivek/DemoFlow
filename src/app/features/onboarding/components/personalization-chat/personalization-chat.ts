import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface FormData {
  idealCustomer: string;
  pricingModel: string;
  commonObjections: string;
}

interface LearnedData {
  idealCustomer: string;
  pricingModel: string;
  commonObjections: string;
}

@Component({
  selector: 'app-personalization-chat',
  standalone: false,
  templateUrl: './personalization-chat.html',
  styleUrl: './personalization-chat.css',
})
export class PersonalizationChat implements OnInit {
  formData: FormData = {
    idealCustomer: '',
    pricingModel: '',
    commonObjections: '',
  };

  learnedData: LearnedData = {
    idealCustomer: 'Small businesses',
    pricingModel: 'Subscription',
    commonObjections: 'Price, features',
  };

  isLoading = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Initialize with sample data from previous steps
    this.updateLearnedData();
  }

  /**
   * Handles the upload button click
   */
  handleUpload(): void {
    console.log('Upload FAQs or Custom Notes clicked');
    // Here you would typically open a file dialog or navigate to upload page
    // For now, we'll just log the action

    // Example implementation:
    // this.router.navigate(['/upload-documents']);
    // or
    // this.openFileDialog();
  }

  /**
   * Handles the "Let's See the Demo" button click
   */
  handleSeeDemo(): void {
    if (!this.isFormValid()) {
      console.log('Form is not valid');
      return;
    }

    console.log('Proceeding to demo with form data:', this.formData);
    this.isLoading = true;

    // Simulate API call or navigation delay
    setTimeout(() => {
      this.isLoading = false;
      // Navigate to demo page
      // this.router.navigate(['/demo']);
    }, 2000);
  }

  /**
   * Handles the voice/speech input for questions
   */
  speakQuestion(questionType: string): void {
    console.log(`Voice input for ${questionType} clicked`);

    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Voice recognition started');
        // You could add a visual indicator here
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice input received:', transcript);

        // Update the appropriate form field
        switch (questionType) {
          case 'idealCustomer':
            this.formData.idealCustomer = transcript;
            break;
          case 'pricingModel':
            // For select dropdown, you might want to match the transcript to available options
            this.matchPricingModel(transcript);
            break;
          case 'commonObjections':
            this.formData.commonObjections = transcript;
            break;
        }

        this.updateLearnedData();
      };

      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
      };

      recognition.start();
    } else {
      console.log('Web Speech API not supported in this browser');
      // Fallback or show message to user
    }
  }

  /**
   * Matches voice input to pricing model options
   */
  private matchPricingModel(transcript: string): void {
    const lowerTranscript = transcript.toLowerCase();

    if (lowerTranscript.includes('subscription')) {
      this.formData.pricingModel = 'subscription';
    } else if (
      lowerTranscript.includes('one-time') ||
      lowerTranscript.includes('one time')
    ) {
      this.formData.pricingModel = 'one-time';
    } else if (
      lowerTranscript.includes('freemium') ||
      lowerTranscript.includes('free')
    ) {
      this.formData.pricingModel = 'freemium';
    } else if (
      lowerTranscript.includes('usage') ||
      lowerTranscript.includes('usage based')
    ) {
      this.formData.pricingModel = 'usage-based';
    } else if (
      lowerTranscript.includes('tiered') ||
      lowerTranscript.includes('tier')
    ) {
      this.formData.pricingModel = 'tiered';
    } else {
      // If no match found, just set the raw transcript
      this.formData.pricingModel = transcript;
    }
  }

  /**
   * Validates if the form has required fields filled
   */
  isFormValid(): boolean {
    return !!(
      this.formData.idealCustomer.trim() &&
      this.formData.pricingModel.trim() &&
      this.formData.commonObjections.trim()
    );
  }

  /**
   * Updates the learned data display based on form inputs
   */
  private updateLearnedData(): void {
    this.learnedData = {
      idealCustomer: this.formData.idealCustomer || 'Small businesses',
      pricingModel: this.formData.pricingModel || 'Subscription',
      commonObjections: this.formData.commonObjections || 'Price, features',
    };
  }

  /**
   * Watches for form changes and updates learned data
   */
  onFormChange(): void {
    this.updateLearnedData();
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.isFormValid()) {
      this.handleSeeDemo();
    }
  }

  /**
   * Clears the form data
   */
  clearForm(): void {
    this.formData = {
      idealCustomer: '',
      pricingModel: '',
      commonObjections: '',
    };
    this.updateLearnedData();
  }

  /**
   * Saves form data to local storage or service
   */
  saveFormData(): void {
    // Example: Save to localStorage
    // localStorage.setItem('demoGenieFormData', JSON.stringify(this.formData));

    // Or save to a service
    // this.dataService.saveFormData(this.formData);

    console.log('Form data saved:', this.formData);
  }

  /**
   * Loads form data from local storage or service
   */
  loadFormData(): void {
    // Example: Load from localStorage
    // const savedData = localStorage.getItem('demoGenieFormData');
    // if (savedData) {
    //   this.formData = JSON.parse(savedData);
    //   this.updateLearnedData();
    // }
    // Or load from a service
    // this.dataService.getFormData().subscribe(data => {
    //   this.formData = data;
    //   this.updateLearnedData();
    // });
  }

  getConfidenceLevel(): number {
    // Example logic to determine confidence level
    let confidence = 0;

    if (this.formData.idealCustomer) {
      confidence += 33;
    }
    if (this.formData.pricingModel) {
      confidence += 33;
    }
    if (this.formData.commonObjections) {
      confidence += 34;
    }

    return confidence;
  }

  handleGoBack() {
    this.router.navigate(['onboarding/product-data']);
  }
}
