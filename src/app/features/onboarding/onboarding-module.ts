import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing-module';
import { ProductDataFeed } from './components/product-data-feed/product-data-feed';
import { PersonalizationChat } from './components/personalization-chat/personalization-chat';
import { LearningSummary } from './components/learning-summary/learning-summary';
import { ReadyToGo } from './components/ready-to-go/ready-to-go';
import { OnboardingContainer } from './containers/onboarding-container/onboarding-container';
import { WelcomeScreen } from './components/welcome-screen/welcome-screen';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    ProductDataFeed,
    PersonalizationChat,
    LearningSummary,
    ReadyToGo,
    OnboardingContainer,
    WelcomeScreen,
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    FormsModule,
    BaseChartDirective,
  ],
})
export class OnboardingModule {}
