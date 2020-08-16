import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-moderation-settings',
  templateUrl: './moderation-settings.component.html',
  styleUrls: ['./moderation-settings.component.css'],
})
export class ModerationSettingsComponent implements OnInit {
  @Input() guild: Guild;

  saving = false;
  channels: Channel[] = [];
  categories: channelGroup[] = [];

  modLog: FormControl;

  moderation: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private location: Location,
    private discordService: DiscordService
  ) {}

  ngOnInit(): void {
    this.fetchSettings();
  }

  fetchSettings() {
    if (!this.guild.settings.moderation) this.guild.settings.moderation = {};

    if (!this.guild.settings.moderation.enabled)
      this.location.replaceState(`/dashboard/${this.guild.id}`);

    this.modLog = new FormControl(this.guild.settings.moderation.modLog);

    this.moderation = new FormGroup({
      modLog: this.modLog,
    });

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

  async save() {
    const updated = this.moderation.value;
    if (updated.manualVerify && !updated.staffRole)
      return this.snackbar.open('Please choose a Staff Role!', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    this.saving = true;

    const settings = this.guild.settings;

    settings.moderation.modLog = updated.modLog;

    this.discordService
      .updateGuild(this.guild.id, 'moderation', settings)
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

        this.fetchSettings();
        this.snackbar
          .open('Saved Changes', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
          .afterDismissed()
          .subscribe(() => {
            location.reload();
          });
      });
  }
}
