import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // Dashboard Stats
  isBrowser = false;

  totalViews: number = 2432;
  avgWatchTime: string = '01:42 min';
  completionRate: number = 63;
  leadsCaptured: number = 318;

  // Engagement Funnel Chart Data
  engagementChartData: ChartData<'bar'> = {
    labels: ['Views', 'Engaged', 'Clicked', 'Completed', 'Converted'],
    datasets: [
      {
        label: 'Total Users',
        data: [2432, 1945, 1654, 1205, 845],
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgba(107, 114, 128, 1)',
          'rgba(107, 114, 128, 1)',
          'rgba(107, 114, 128, 1)',
          'rgba(107, 114, 128, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Engaged Users',
        data: [0, 1654, 1205, 985, 654],
        backgroundColor: [
          'transparent',
          'rgba(16, 185, 129, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'transparent',
          'rgba(16, 185, 129, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  engagementChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
      },
    },
  };

  // Lead Intelligence Chart Data
  leadIntelligenceChartData: ChartData<'doughnut'> = {
    labels: ['High Intent', 'Medium Intent', 'Low Intent', 'Unqualified'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  leadIntelligenceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.parsed + '%';
          },
        },
      },
    },
  };

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.animateCounters();
    }
  }

  // Animate counter numbers on component load
  animateCounters(): void {
    const duration = 2000;
    const startTime = performance.now();

    const animateValue = (
      start: number,
      end: number,
      callback: (value: number) => void
    ) => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        callback(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Animate total views
    animateValue(0, this.totalViews, (value) => {
      this.totalViews = value;
    });

    // Animate completion rate
    animateValue(0, this.completionRate, (value) => {
      this.completionRate = value;
    });

    // Animate leads captured
    animateValue(0, this.leadsCaptured, (value) => {
      this.leadsCaptured = value;
    });
  }

  // Component methods
  exportReport(): void {
    console.log('Exporting analytics report...');
    // Implement export functionality
  }

  startABTest(): void {
    console.log('Starting A/B test...');
    // Implement A/B testing functionality
  }

  updateAndReplay(): void {
    console.log('Updating and replaying demo...');
    // Implement demo update functionality
  }
}
