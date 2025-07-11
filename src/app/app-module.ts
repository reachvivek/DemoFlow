import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BaseChartDirective],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [App],
})
export class AppModule {}
