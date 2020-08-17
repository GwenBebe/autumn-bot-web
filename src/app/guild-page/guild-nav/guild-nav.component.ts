import { Component, OnInit, Input } from '@angular/core';
import { Guild } from '../../discord.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-guild-nav',
  templateUrl: './guild-nav.component.html',
  styleUrls: ['./guild-nav.component.scss'],
})
export class GuildNavComponent implements OnInit {
  @Input() guild: Guild;
  icon?: string;
  nameAcronym: string;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.nameAcronym = this.guild.name
      .replace(/\w+/g, (name) => name[0])
      .replace(/\s/g, '');

    this.icon = this.guild.icon
      ? `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.${
          this.guild.icon.startsWith('a_') ? 'gif' : 'png'
        }`
      : undefined;
  }
  goBack(): void {
    this.location.back();
  }
}
