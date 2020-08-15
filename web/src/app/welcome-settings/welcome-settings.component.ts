import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Guild, Role, Channel, DiscordService } from '../discord.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

interface channelGroup {
  pos: number;
  id: string;
  name: string;
  channels: Channel[];
}

@Component({
  selector: 'app-welcome-settings',
  templateUrl: './welcome-settings.component.html',
  styleUrls: ['./welcome-settings.component.css'],
})
export class WelcomeSettingsComponent implements OnInit {
  @Input() guild: Guild;

  saving = false;

  channels: Channel[] = [];
  categories: channelGroup[] = [];

  verifyDesc: string;

  welcomeChannel: FormControl;
  backgroundColor: FormControl;
  textColor: FormControl;
  profileColor: FormControl;

  welcome: FormGroup;

  preview: string;

  constructor(
    private snackbar: MatSnackBar,
    private location: Location,
    private discordService: DiscordService
  ) {}

  ngOnInit(): void {
    if (!this.guild.settings.welcome) this.guild.settings.welcome = {};
    if (!this.guild.settings.general) this.guild.settings.general = {};
    if (!this.guild.settings.welcome.enabled) this.location.back();
    console.log(this.guild.settings.welcome);

    this.welcomeChannel = new FormControl(
      this.guild.settings.welcome?.welcomeChannel
    );
    this.backgroundColor = new FormControl(
      this.guild.settings.welcome?.backgroundColor || '#2b2929'
    );
    this.textColor = new FormControl(
      this.guild.settings.welcome?.textColor || '#ffffff'
    );
    this.profileColor = new FormControl(
      this.guild.settings.welcome?.profileColor || '#eb4034'
    );

    this.welcome = new FormGroup({
      welcomeChannel: this.welcomeChannel,
      backgroundColor: this.backgroundColor,
      textColor: this.textColor,
      profileColor: this.profileColor,
    });

    this.preview = `https://api.autumn-forest.net/api/v1/cards/style1?textColor=${encodeURIComponent(
      this.textColor.value
    )}&backgroundColor=${encodeURIComponent(
      this.backgroundColor.value
    )}&profileColor=${encodeURIComponent(this.profileColor.value)}`;

    this.guild.channels.forEach((channel) => {
      if (channel.type === 4) {
        if (!this.categories.find((cat) => cat.id === channel.id)) {
          this.categories.push({
            pos: channel.position,
            id: channel.id,
            name: channel.name,
            channels: [],
          });
        }
      }
      if (channel.type === 0 || channel.type === 5) {
        const category = this.guild.channels.find(
          (c) => c.id === channel.parent_id
        );

        const group = category
          ? this.categories.find((cat) => cat.id === category.id)
          : undefined;

        if (category)
          group
            ? group.channels.push(channel)
            : this.categories.push({
                pos: category.position,
                id: category.id,
                name: category.name,
                channels: [],
              });
        else this.channels.push(channel);
      }

      this.channels.sort((a, b) => (a.position > b.position ? 1 : -1));

      this.categories.forEach((cat) => {
        cat.channels.sort((a, b) => (a.position > b.position ? 1 : -1));
      });

      this.categories.sort((a, b) => (a.pos > b.pos ? 1 : -1));
    });
  }

  encodeURIComponent(str: string) {
    return encodeURIComponent(str);
  }

  async save() {
    const updated = this.welcome.value;
    if (updated.manualVerify && !updated.staffRole)
      return this.snackbar.open('Please choose a Staff Role!', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    this.saving = true;

    const settings = this.guild.settings;

    console.log(updated);

    settings.welcome.welcomeChannel = updated.welcomeChannel;
    settings.welcome.textColor = updated.textColor;
    settings.welcome.backgroundColor = updated.backgroundColor;
    settings.welcome.profileColor = updated.profileColor;

    this.discordService
      .updateGuild(this.guild.id, 'welcome', settings)
      .subscribe((response) => {
        this.saving = false;
        console.log(response);
        if (response.status === 'error')
          return this.snackbar.open(
            `${response.statusCode}: ${response.message || 'No Error Message'}`,
            'Close',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );

        this.snackbar.open('Saved Changes', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      });
  }
}
