import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor} from './shared/CustomHttpInterceptor';
import { HttpStatusService } from './shared/http-status.service';
import { FormatDatePipe } from './shared/custom.date';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule ,
    MatIconModule,
    BrowserAnimationsModule,
    MatGridListModule,
    NgbModule
  ],
  providers: [HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true,deps: [HttpStatusService] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
