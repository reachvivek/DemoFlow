import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingContainer } from './containers/onboarding-container/onboarding-container';
import { ProductDataFeed } from './components/product-data-feed/product-data-feed';
import { PersonalizationChat } from './components/personalization-chat/personalization-chat';
import { LearningSummary } from './components/learning-summary/learning-summary';
import { ReadyToGo } from './components/ready-to-go/ready-to-go';
import { WelcomeScreen } from './components/welcome-screen/welcome-screen';

const routes: Routes = [
  {
    path: '',
    component: OnboardingContainer,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      { path: 'welcome', component: WelcomeScreen },
      {
        path: 'product-data',
        component: ProductDataFeed,
        data: { step: 2, title: 'Feed Me Your Product Data' },
      },
      {
        path: 'personalization',
        component: PersonalizationChat,
        data: { step: 3, title: 'Q&A Personalization Chat' },
      },
      {
        path: 'review',
        component: LearningSummary,
        data: { step: 4, title: "Let Me Show You What I've Learned" },
      },
      {
        path: 'deploy',
        component: ReadyToGo,
        data: { step: 5, title: "You're Ready to Go Live!" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
