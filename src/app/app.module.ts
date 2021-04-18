import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {StockState} from './stock/state/stock.state';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@Injectable()
export class SocketChat extends Socket {

  constructor() {
    super({ url: 'http://localhost:3000', options: {} });
  }

}

@Injectable()
export class SocketStock extends Socket {

  constructor() {
    super({ url: 'http://localhost:3100', options: {} });
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    NgbModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
