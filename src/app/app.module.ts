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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { RedirectComponent } from './redirect/redirect.component';
import { GuildComponent } from './guild/guild.component';
import { GuildsComponent } from './guilds/guilds.component';
import { GuildPageComponent } from './guild-page/guild-page.component';
import { GuildNavComponent } from './guild-nav/guild-nav.component';
import { ModuleComponent } from './module/module.component';
import { ModulesComponent } from './modules/modules.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VerificationComponent } from './verification/verification.component';
import { VerificationSettingsComponent } from './verification-settings/verification-settings.component';
import { ModerationSettingsComponent } from './moderation-settings/moderation-settings.component';
import { ModerationComponent } from './moderation/moderation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeSettingsComponent } from './welcome-settings/welcome-settings.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { UploadImageComponent } from './upload-image/upload-image.component';
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomePageComponent,
    GuildComponent,
    GuildsComponent,
    RedirectComponent,
    GuildPageComponent,
    GuildNavComponent,
    ModuleComponent,
    ModulesComponent,
    GeneralSettingsComponent,
    VerificationComponent,
    VerificationSettingsComponent,
    ModerationComponent,
    ModerationSettingsComponent,
    WelcomeComponent,
    WelcomeSettingsComponent,
    UploadImageComponent,
  ],
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ColorSketchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
