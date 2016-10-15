import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { App } from './components/app';

@NgModule({
  declarations: [App],
  imports: [BrowserModule],
  bootstrap: [App]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule)
