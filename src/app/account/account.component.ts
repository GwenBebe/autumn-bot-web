import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DiscordService, User } from '../discord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  loggedIn = false;
  userinfo: User | undefined;
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
    this.discordService.getUserInfo().subscribe((res) => {
      if (res.status === 'success') {
        console.log(res);

        const userinfo: User = res.data;

        this.userinfo = userinfo;
        this.updateInfo();
      } else window.location.href = `/api/discord/login`;
    });
  }

  logout() {
    window.location.href = `/api/discord/logout`;
  }

  private autoLogin() {
    this.discordService.getUserInfo().subscribe((res) => {
      if (res.status === 'success') {
        const userinfo: User = res.data;

        this.userinfo = userinfo;
        this.updateInfo();
      }
    });
  }

  private updateInfo() {
    if (!this.userinfo) return;

    const avatarHash = this.userinfo.avatar;

    let ext = 'png';

    if (avatarHash?.startsWith('a_')) ext = 'gif';

    this.avatarUrl = this.userinfo.avatar
      ? `https://cdn.discordapp.com/avatars/${this.userinfo.id}/${this.userinfo.avatar}.${ext}?size=128`
      : `https://cdn.discordapp.com/embed/avatars/${
          parseInt(this.userinfo.discriminator) % 5
        }.png`;

    this.username = this.userinfo.username;

    this.discriminator = this.userinfo.discriminator;

    this.loggedIn = true;
  }
}
