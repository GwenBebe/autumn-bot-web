import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guild, DiscordService } from '../discord.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {
  @Input() name: string;
  @Input() icon: string;
  @Input() identifier: string;
  @Input() description: string;
  @Input() enabled: boolean;
  @Input() guild: Guild;
  enabledForm: FormControl;

  constructor(
    private snackbar: MatSnackBar,
    private discordService: DiscordService
  ) {}

  ngOnInit(): void {
    this.enabledForm = new FormControl(this.enabled);
  }

  toggle() {
    const settings = this.guild.settings;

    this.enabled = !this.enabled;

    if (
      !settings[this.identifier] ||
      !(settings[this.identifier] instanceof Object)
    )
      settings[this.identifier] = { enabled: this.enabled };
    else settings[this.identifier].enabled = this.enabled;

    console.log(settings);

    this.discordService
      .updateGuild(this.guild.id, this.identifier, settings)
      .subscribe((response) => {
        console.log(response);
        if (response.status === 'error') {
          this.enabled = !this.enabled;

          return this.snackbar.open(
            `Error Saving: ${response.message}`,
            'Close',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            }
          );
        }

        this.snackbar.open(
          `${this.enabled ? 'Enabled' : 'Disabled'} ${this.name}`,
          'Close',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
      });
  }
}
