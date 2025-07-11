import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-ready-to-go',
  standalone: false,
  templateUrl: './ready-to-go.html',
  styleUrl: './ready-to-go.css',
})
export class ReadyToGo implements OnInit {
  isBrowser: boolean = false;
  // Embed code configuration
  embedCode: string = `<iframe src="https://demo-genie.ai/embed/your-demo-id" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  isCopied: boolean = false;

  // Configuration options
  enableAutoVoice: boolean = false;
  enableCRMIntegration: boolean = false;

  // Analytics data
  totalViews: number = 1247;
  conversionRate: number = 12;
  avgEngagement: number = 45;
  leadGenerated: number = 159;

  // Chart configuration
  chartType: ChartType = 'doughnut';
  chartData: ChartData<'doughnut'> = {
    labels: ['Completed Demos', 'Partial Views', 'Bounced'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          '#10b981', // green
          '#3b82f6', // blue
          '#6b7280', // gray
        ],
        borderWidth: 0,
        hoverBackgroundColor: ['#059669', '#2563eb', '#4b5563'],
      },
    ],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
    animation: {},
  };

  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.updateEmbedCode();
    this.simulateRealTimeData();
  }

  /**
   * Copy embed code to clipboard
   */
  copyEmbedCode(): void {
    navigator.clipboard
      .writeText(this.embedCode)
      .then(() => {
        this.isCopied = true;

        // Reset copy state after 2 seconds
        setTimeout(() => {
          this.isCopied = false;
        }, 2000);

        // Show success feedback
        this.showCopySuccessAnimation();
      })
      .catch((err) => {
        console.error('Failed to copy embed code:', err);
        // Fallback for older browsers
        this.fallbackCopyTextToClipboard(this.embedCode);
      });
  }

  /**
   * Fallback copy method for older browsers
   */
  private fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  }

  /**
   * Show copy success animation
   */
  private showCopySuccessAnimation(): void {
    const copyBtn = document.querySelector('.copy-embed-btn');
    if (copyBtn) {
      copyBtn.classList.add('copy-success');
      setTimeout(() => {
        copyBtn.classList.remove('copy-success');
      }, 500);
    }
  }

  /**
   * Update embed code based on configuration
   */
  private updateEmbedCode(): void {
    const baseUrl = 'https://demo-genie.ai/embed/your-demo-id';
    const params = new URLSearchParams();

    if (this.enableAutoVoice) {
      params.append('autoVoice', 'true');
    }

    if (this.enableCRMIntegration) {
      params.append('crmIntegration', 'true');
    }

    const queryString = params.toString();
    const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    this.embedCode = `<iframe src="${fullUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
  }

  /**
   * Watch for configuration changes and update embed code
   */
  onConfigurationChange(): void {
    this.updateEmbedCode();
  }

  /**
   * Navigate to full analytics dashboard
   */
  viewFullDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Go live with the demo
   */
  goLive(): void {
    // Here you would typically make an API call to activate the demo
    console.log('Demo is now live!');

    // Show success message or navigate to live demo
    this.router.navigate(['/dashboard/live-demos']);
  }

  /**
   * Navigate back to demo tweaking screen
   */
  backToTweak(): void {
    this.router.navigate(['/demo-setup/step-3']);
  }

  /**
   * Navigate to CRM connection screen
   */
  connectToCRM(): void {
    this.router.navigate(['/integrations/crm']);
  }

  /**
   * Simulate real-time data updates
   */
  private simulateRealTimeData(): void {
    setInterval(() => {
      // Simulate small changes in analytics data
      this.totalViews += Math.floor(Math.random() * 3);
      this.conversionRate = Math.max(
        0,
        Math.min(100, this.conversionRate + (Math.random() - 0) * 2)
      );
      this.avgEngagement += Math.floor((Math.random() - 0.5) * 2);
      this.leadGenerated += Math.floor(Math.random() * 2);

      // Update chart data occasionally
      if (Math.random() < 0.1) {
        this.updateChartData();
      }
    }, 5000); // Update every 5 seconds
  }

  /**
   * Update chart data with new values
   */
  private updateChartData(): void {
    const newData = [
      Math.max(
        50,
        Math.min(
          80,
          (this.chartData.datasets[0].data[0] as number) +
            (Math.random() - 0.5) * 5
        )
      ),
      Math.max(
        15,
        Math.min(
          35,
          (this.chartData.datasets[0].data[1] as number) +
            (Math.random() - 0.5) * 3
        )
      ),
      Math.max(
        5,
        Math.min(
          20,
          (this.chartData.datasets[0].data[2] as number) +
            (Math.random() - 0.5) * 2
        )
      ),
    ];

    // Ensure they sum to 100
    const total = newData.reduce((sum, val) => sum + val, 0);
    this.chartData.datasets[0].data = newData.map((val) =>
      Math.round((val / total) * 100)
    );
  }

  /**
   * Generate shareable demo link
   */
  generateShareableLink(): string {
    return `https://demo-genie.ai/demo/your-demo-id`;
  }

  /**
   * Download embed code as file
   */
  downloadEmbedCode(): void {
    const element = document.createElement('a');
    const file = new Blob([this.embedCode], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'demo-embed-code.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  /**
   * Preview demo in new window
   */
  previewDemo(): void {
    const previewUrl = this.generateShareableLink();
    window.open(previewUrl, '_blank', 'width=800,height=600');
  }

  /**
   * Get formatted analytics summary
   */
  getAnalyticsSummary(): string {
    return `Total Views: ${this.totalViews.toLocaleString()} | Conversion Rate: ${this.conversionRate.toFixed(
      1
    )}% | Avg Engagement: ${this.avgEngagement}s | Leads: ${
      this.leadGenerated
    }`;
  }
}
