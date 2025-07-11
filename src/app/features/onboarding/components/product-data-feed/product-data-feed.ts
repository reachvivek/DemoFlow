import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-data-feed',
  standalone: false,
  templateUrl: './product-data-feed.html',
  styleUrl: './product-data-feed.css',
})
export class ProductDataFeed {
  productData: any = {
    websiteUrl: '',
    description: '',
    videoUrl: '',
  };

  isOptionalSectionExpanded = false;
  isLoading = false;
  selectedPresentationFile: File | null = null;
  statusMessage: { type: 'success' | 'error' | 'info'; text: string } | null =
    null;

  constructor(private readonly router: Router) {}

  toggleOptionalSection() {
    this.isOptionalSectionExpanded = !this.isOptionalSectionExpanded;
  }

  analyzeProduct() {
    if (!this.isFormValid()) {
      this.showStatusMessage('error', 'Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    this.showStatusMessage('info', 'Analyzing your product...');

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.showStatusMessage(
        'success',
        'Product analysis completed successfully!'
      );

      // Clear success message after 3 seconds
      setTimeout(() => {
        this.statusMessage = null;
        this.router.navigate(['onboarding/step-2']);
      }, 3000);
    }, 2000);
  }

  triggerFileUpload(type: string) {
    if (type === 'presentation') {
      const fileInput = document.querySelector(
        'input[type="file"][accept=".pdf,.ppt,.pptx"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    }
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file && type === 'presentation') {
      this.selectedPresentationFile = file;
      this.showStatusMessage(
        'success',
        `File "${file.name}" selected successfully`
      );

      // Clear success message after 2 seconds
      setTimeout(() => {
        this.statusMessage = null;
      }, 2000);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent, type: string) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;
    target.classList.remove('drag-over');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && type === 'presentation') {
      const file = files[0];
      const allowedTypes = ['.pdf', '.ppt', '.pptx'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

      if (allowedTypes.includes(fileExtension)) {
        this.selectedPresentationFile = file;
        this.showStatusMessage(
          'success',
          `File "${file.name}" uploaded successfully`
        );

        // Clear success message after 2 seconds
        setTimeout(() => {
          this.statusMessage = null;
        }, 2000);
      } else {
        this.showStatusMessage(
          'error',
          'Please upload a valid file (.pdf, .ppt, .pptx)'
        );
      }
    }
  }

  isFormValid(): boolean {
    return !!(
      this.productData.websiteUrl && this.productData.websiteUrl.trim()
    );
  }

  private showStatusMessage(type: 'success' | 'error' | 'info', text: string) {
    this.statusMessage = { type, text };
  }
}
