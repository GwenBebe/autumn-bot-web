import { Component, OnInit } from '@angular/core';
import { Guild, DiscordService } from '../../../discord.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  guild: Guild;

  constructor(
    private route: ActivatedRoute,
    private discordService: DiscordService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const guild = params.guild;

      this.discordService.getGuild(guild).subscribe((res) => {
        if (res.status === 'success') {
          const data: Guild = res.data;

          this.guild = data;
        } else {
          if (res.message === 'Unauthorized')
            return (window.location.href = `/home`);
          else
            return this.snackbar.open(
              `${res.statusCode}: ${res.message || 'No Error Message'}`,
              'Close',
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              }
            );
        }
      });
    });
  }
}
