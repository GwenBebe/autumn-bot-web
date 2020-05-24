import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DiscordService, userinfo } from '../discord.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  loggedIn = false;
  userinfo: userinfo | undefined;
  avatarUrl = '';
  username = '';
  discriminator = '';

  constructor(private discordService: DiscordService) {}

  ngOnInit() {
    this.autoLogin();
  }

  get isLoggedIn() {
    return this.loggedIn;
  }

  login() {
    this.discordService.getUserInfo().subscribe((userinfo) => {
      if (userinfo.message === 'SUCCESS') {
        this.userinfo = userinfo.data;
        this.updateInfo();
      } else window.location.href = `http://localhost:3000/api/discord/login`;
    });
  }

  logout() {
    window.location.href = 'http://localhost:3000/api/discord/logout';
  }

  private autoLogin() {
    this.discordService.getUserInfo().subscribe((userinfo) => {
      if (userinfo.message === 'SUCCESS') {
        this.userinfo = userinfo.data;
        this.updateInfo();
      }
    });
  }

  private updateInfo() {
    if (!this.userinfo) return;

    const avatarHash = this.userinfo.avatar;

    let ext = 'png';

    if (avatarHash.startsWith('a_')) ext = 'gif';

    this.avatarUrl = `https://cdn.discordapp.com/avatars/${this.userinfo.id}/${this.userinfo.avatar}.${ext}?size=128`;

    this.username = this.userinfo.username;

    this.discriminator = this.userinfo.discriminator;

    this.loggedIn = true;
  }
}
