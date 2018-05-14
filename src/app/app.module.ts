import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { NgbModule }      from '@ng-bootstrap/ng-bootstrap';
import { MomentModule }   from 'angular2-moment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MainComponent }      from './main.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    MomentModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false, passThruUnkownUrl:true }
    //)
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
