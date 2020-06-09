import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GuildsComponent } from './guilds/guilds.component';
import { RedirectComponent } from './redirect/redirect.component';
import { GuildPageComponent } from './guild-page/guild-page.component';
import { VerificationComponent } from './verification/verification.component';
import { ModerationComponent } from './moderation/moderation.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'dashboard', component: GuildsComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'dashboard/:guild', component: GuildPageComponent },
  { path: 'dashboard/:guild/verification', component: VerificationComponent },
  { path: 'dashboard/:guild/moderation', component: ModerationComponent },
  { path: 'dashboard/:guild/welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
