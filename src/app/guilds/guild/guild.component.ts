import { Component, OnInit, Input } from '@angular/core';
import { partialGuild } from '../../discord.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss'],
})
export class GuildComponent implements OnInit {
  @Input() name: string;
  @Input() iconHash?: string;
  @Input() id: string = '';
  @Input() guildInfo: partialGuild;
  icon?: string;
  nameAcronym: string;

  constructor() {}

  ngOnInit(): void {
    this.nameAcronym = this.name
      .replace(/\w+/g, (name) => name[0])
      .replace(/\s/g, '');

    this.icon = this.iconHash
      ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${
          this.iconHash.startsWith('a_') ? 'gif' : 'png'
        }`
      : undefined;
  }

  invite() {
    window.open(
      `https://www.autumnbot.net/api/discord/invite/${this.id}`,
      'popup',
      'width=600,height=600'
    );
  }
}
