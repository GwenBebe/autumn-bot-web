import { Component, OnInit, Input } from '@angular/core';
import {
  Guild,
  Role,
  Channel,
  DiscordService,
} from '../../../../discord.service';
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
  selector: 'app-verification-settings',
  templateUrl: './verification-settings.component.html',
  styleUrls: ['./verification-settings.component.scss'],
})
export class VerificationSettingsComponent implements OnInit {
  @Input() guild: Guild;

  saving = false;

  selectedStaffRole: string | undefined;
  roles: Role[] = [];
  channels: Channel[] = [];
  categories: channelGroup[] = [];
  noStaff = true;

  verifyDesc: string;

  manualVerify: FormControl;
  nonVerifiedChannels: FormControl;
  verifyMessage: FormControl;
  denyMessage: FormControl;
  acceptMessage: FormControl;
  staffRole: FormControl;
  pingStaff: FormControl;

  verification: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private location: Location,
    private discordService: DiscordService
  ) {}

  ngOnInit(): void {
    if (!this.guild.settings.verification)
      this.guild.settings.verification = {};
    if (!this.guild.settings.verification?.enabled)
      this.location.replaceState(`/dashboard/${this.guild.id}`);

    this.verifyDesc = `Have staff manually verify application messages. Doesn't require users to send ${
      this.guild.settings.general?.prefix || '-'
    }verify to be verified.`;

    this.manualVerify = new FormControl(
      this.guild.settings.verification?.manualVerify
    );
    this.pingStaff = new FormControl(
      this.guild.settings.verification?.pingStaff
    );
    this.nonVerifiedChannels = new FormControl(
      this.guild.settings.verification?.nonVerifiedChannels
    );
    this.verifyMessage = new FormControl(
      this.guild.settings.verification?.verifyMessage
    );
    this.denyMessage = new FormControl(
      this.guild.settings.verification?.denyMessage
    );
    this.acceptMessage = new FormControl(
      this.guild.settings.verification?.acceptMessage
    );
    this.staffRole = new FormControl(
      this.guild.settings.verification?.staffRole,
      [Validators.required]
    );

    this.verification = new FormGroup({
      manualVerify: this.manualVerify,
      nonVerifiedChannels: this.nonVerifiedChannels,
      verifyMessage: this.verifyMessage,
      denyMessage: this.denyMessage,
      acceptMessage: this.acceptMessage,
      staffRole: this.staffRole,
      pingStaff: this.pingStaff,
    });

    this.selectedStaffRole = this.guild.settings.verification?.staffRole;

    this.guild.roles.forEach((role) => {
      if (!role.managed) this.roles.push(role);
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
    const updated = this.verification.value;
    if (updated.manualVerify && !updated.staffRole)
      return this.snackbar.open('Please choose a Staff Role!', 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    this.saving = true;

    const settings = this.guild.settings;

    settings.verification.verifyMessage = updated.verifyMessage;
    settings.verification.nonVerifiedChannels = updated.nonVerifiedChannels;
    settings.verification.staffRole = updated.staffRole;
    settings.verification.manualVerify = updated.manualVerify;
    settings.verification.acceptMessage = updated.acceptMessage;
    settings.verification.denyMessage = updated.denyMessage;
    settings.verification.pingStaff = updated.pingStaff;

    this.discordService
      .updateGuild(this.guild.id, 'verification', settings)
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
