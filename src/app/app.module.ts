import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CookieDialog } from './app.component';
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
import { GuildComponent } from './guilds/guild/guild.component';
import { GuildsComponent } from './guilds/guilds.component';
import { GuildPageComponent } from './guild-page/guild-page.component';
import { GuildNavComponent } from './guild-page/guild-nav/guild-nav.component';
import { ModuleComponent } from './guild-page/modules/module/module.component';
import { ModulesComponent } from './guild-page/modules/modules.component';
import { GeneralSettingsComponent } from './guild-page/settings/general-settings/general-settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VerificationComponent } from './guild-page/settings/verification/verification.component';
import { VerificationSettingsComponent } from './guild-page/settings/verification/verification-settings/verification-settings.component';
import { ModerationSettingsComponent } from './guild-page/settings/moderation/moderation-settings/moderation-settings.component';
import { ModerationComponent } from './guild-page/settings/moderation/moderation.component';
import { WelcomeComponent } from './guild-page/settings/welcome/welcome.component';
import { WelcomeSettingsComponent } from './guild-page/settings/welcome/welcome-settings/welcome-settings.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { UploadImageComponent } from './guild-page/settings/welcome/upload-image/upload-image.component';
import { CommandsPageComponent } from './commands-page/commands-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { FeaturesPageComponent } from './features-page/features-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
    CommandsPageComponent,
    CookieDialog,
    FeaturesPageComponent,
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
    MatExpansionModule,
    MatDialogModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
