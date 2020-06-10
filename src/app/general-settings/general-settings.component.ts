import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Guild, Role, DiscordService } from '../discord.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css'],
})
export class GeneralSettingsComponent implements OnInit {
  @Input() guild: Guild;

  saving = false;

  prefix: FormControl;
  deleteCommands: FormControl;
  memberRole: FormControl;
  memeResponses: FormControl;

  general: FormGroup;
  selectedMemberRole: string | undefined;
  roles: Role[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private discordService: DiscordService
  ) {}

  ngOnInit(): void {
    if (!this.guild.settings.general) this.guild.settings.general = {};

    this.prefix = new FormControl(this.guild.settings.general?.prefix);
    this.deleteCommands = new FormControl(
      this.guild.settings.general?.deleteCommands
    );
    this.memberRole = new FormControl(this.guild.settings.general?.memberRole);
    this.memeResponses = new FormControl(
      this.guild.settings.general?.memeResponses
    );
    this.general = new FormGroup({
      prefix: this.prefix,
      deleteCommands: this.deleteCommands,
      memberRole: this.memberRole,
      memeResponses: this.memeResponses,
    });

    this.selectedMemberRole = this.guild.settings.general?.memberRole;

    console.log(this.general.value);

    this.guild.roles.forEach((role) => {
      if (!role.managed) this.roles.push(role);
    });
  }

  save() {
    this.saving = true;

    const updated = this.general.value;
    if (updated.manualVerify && !updated.staffRole)
      return this.snackbar.open('Please choose a Staff Role!', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });

    const settings = this.guild.settings;

    settings.general.prefix = updated.prefix;
    settings.general.deleteCommands = updated.deleteCommands;
    settings.general.memberRole = updated.memberRole;
    settings.general.memeResponses = updated.memeResponses;

    this.discordService
      .updateGuild(this.guild.id, 'general', settings)
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
