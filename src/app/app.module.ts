import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgCalendarModule  } from 'angular-customizable-calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
