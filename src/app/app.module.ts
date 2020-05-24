import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountComponent } from './account/account.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {
  LyThemeModule,
  LY_THEME,
  LY_THEME_NAME,
  StyleRenderer,
  LyTheme2,
} from '@alyle/ui';
import { MinimaDark } from '@alyle/ui/themes/minima';

@NgModule({
  declarations: [AppComponent, AccountComponent, HomePageComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    HammerModule,
  ],
  providers: [
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-dark' },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
