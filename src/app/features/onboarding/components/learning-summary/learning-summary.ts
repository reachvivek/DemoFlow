import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

interface ChatMessage {
  id: string;
  type: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-learning-summary',
  standalone: false,
  templateUrl: './learning-summary.html',
  styleUrl: './learning-summary.css',
})
export class LearningSummary implements OnInit, OnDestroy {
  @ViewChild('demoIframe', { static: false })
  demoIframe!: ElementRef<HTMLIFrameElement>;

  // Demo state
  isLoading = true;
  isPlaying = false;
  currentTime = '0:00';
  totalTime = '3:45';
  demoUrl!: SafeResourceUrl;

  // Chat state
  chatMessages: ChatMessage[] = [];

  // Notes state
  noteText = '';
  commentHistory: Comment[] = [];

  // Timers and intervals
  private playbackTimer: any;
  private demoStartTime: number = 0;
  private demoDuration: number = 225; // 3:45 in seconds
  private currentPlaybackTime: number = 0;

  // SSR check
  isBrowser = false;

  // Preserve message handler reference
  private messageHandler = this.handleIframeMessages.bind(this);

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly sanitizer: DomSanitizer
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.initializeDemo();
    this.initializeChatMessages();
    this.loadCommentHistory();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.addEventListener('message', this.messageHandler);
    }
  }

  ngOnDestroy(): void {
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
    }
    if (this.isBrowser) {
      window.removeEventListener('message', this.messageHandler);
    }
  }

  private initializeDemo(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoading = false;
        const rawUrl = 'https://example.com/demo';
        this.demoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      }, 2000);
    }
  }

  private initializeChatMessages(): void {
    this.chatMessages = [
      {
        id: '1',
        type: 'agent',
        content:
          'Welcome to Nicepay - let me show you how we simplify your financial ops.',
        timestamp: new Date(),
      },
      {
        id: '2',
        type: 'user',
        content: 'Is it built for SMEs or more for enterprises?',
        timestamp: new Date(),
      },
      {
        id: '3',
        type: 'agent',
        content:
          'Great question. While we serve both, most of our customers are fast-growing SMEs.',
        timestamp: new Date(),
      },
      {
        id: '4',
        type: 'user',
        content: 'Can I see how invoicing works?',
        timestamp: new Date(),
      },
      {
        id: '5',
        type: 'agent',
        content: "Sure. Here's a quick walkthrough of the invoicing dashboard.",
        timestamp: new Date(),
      },
    ];
  }

  private loadCommentHistory(): void {
    if (this.isBrowser) {
      const saved = localStorage.getItem('demo_comments');
      if (saved) {
        this.commentHistory = JSON.parse(saved);
      }
    }
  }

  private saveCommentHistory(): void {
    if (this.isBrowser) {
      localStorage.setItem(
        'demo_comments',
        JSON.stringify(this.commentHistory)
      );
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private updatePlaybackTime(): void {
    if (this.isPlaying) {
      this.currentPlaybackTime++;
      this.currentTime = this.formatTime(this.currentPlaybackTime);
      if (this.currentPlaybackTime >= this.demoDuration) {
        this.pauseDemo();
        this.currentPlaybackTime = this.demoDuration;
      }
    }
  }

  private startPlaybackTimer(): void {
    this.playbackTimer = setInterval(() => this.updatePlaybackTime(), 1000);
  }

  private stopPlaybackTimer(): void {
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  onIframeLoad(): void {
    this.isLoading = false;
    console.log('Demo iframe loaded');
  }

  togglePlayPause(): void {
    this.isPlaying ? this.pauseDemo() : this.playDemo();
  }

  private playDemo(): void {
    this.isPlaying = true;
    this.startPlaybackTimer();
    this.sendMessageToIframe({ action: 'play' });
  }

  private pauseDemo(): void {
    this.isPlaying = false;
    this.stopPlaybackTimer();
    this.sendMessageToIframe({ action: 'pause' });
  }

  restartDemo(): void {
    this.isPlaying = false;
    this.currentPlaybackTime = 0;
    this.currentTime = '0:00';
    this.stopPlaybackTimer();
    this.sendMessageToIframe({ action: 'restart' });

    setTimeout(() => this.playDemo(), 500);
  }

  private sendMessageToIframe(message: any): void {
    if (this.demoIframe?.nativeElement?.contentWindow) {
      this.demoIframe.nativeElement.contentWindow.postMessage(message, '*');
    }
  }

  handleReplayDemo(): void {
    this.restartDemo();
    console.log('Replay demo triggered');
  }

  handleTweakDemo(): void {
    console.log('Tweak demo');
    this.showTweakModal();
  }

  handleLooksDeploy(): void {
    console.log('Deploy demo');
    this.showDeployConfirmation();
  }

  private showTweakModal(): void {
    alert('Tweak demo modal');
  }

  private showDeployConfirmation(): void {
    if (confirm('Are you ready to deploy this demo?')) {
      console.log('Deploy confirmed');
    }
  }

  submitNote(): void {
    if (!this.noteText.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: this.noteText.trim(),
      timestamp: new Date(),
    };

    this.commentHistory.unshift(comment);
    this.saveCommentHistory();
    this.noteText = '';
    this.showNotificationMessage('Note submitted successfully!');
    this.sendNoteToService(comment);
  }

  private sendNoteToService(comment: Comment): void {
    console.log('Sending to service:', comment);
  }

  private showNotificationMessage(message: string): void {
    console.log('Notify:', message);
  }

  get isNoteSubmitDisabled(): boolean {
    return !this.noteText.trim();
  }

  get hasComments(): boolean {
    return this.commentHistory.length > 0;
  }

  simulateNewChatMessage(): void {
    const responses = [
      'Let me show you our payment processing features.',
      "Here's how you can track your cash flow in real-time.",
      'Would you like to see our reporting dashboard?',
      'This integration works with most accounting software.',
      'Our API is very developer-friendly.',
    ];
    const message = responses[Math.floor(Math.random() * responses.length)];

    this.chatMessages.push({
      id: Date.now().toString(),
      type: 'agent',
      content: message,
      timestamp: new Date(),
    });

    setTimeout(() => this.scrollChatToBottom(), 100);
  }

  private scrollChatToBottom(): void {
    if (!this.isBrowser) return;
    const chat = document.querySelector('.chat-messages');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }

  handleIframeMessages(event: MessageEvent): void {
    if (!this.isBrowser || event.origin !== window.location.origin) return;

    const { action, data } = event.data;

    switch (action) {
      case 'demo_progress':
        this.currentPlaybackTime = data.currentTime;
        this.currentTime = this.formatTime(this.currentPlaybackTime);
        break;
      case 'demo_ended':
        this.pauseDemo();
        break;
      case 'demo_interaction':
        console.log('Interaction in demo:', data);
        break;
    }
  }
}
