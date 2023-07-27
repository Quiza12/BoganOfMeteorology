import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { BomDataService } from './services/bom-data.service';
import { BoganService } from './services/bogan.service';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent
  ],
  providers: [
    BomDataService,
    BoganService,
    HttpClientModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [
    MainComponent
  ]
})
export class AppModule { }
