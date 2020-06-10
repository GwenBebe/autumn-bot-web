import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guild, DiscordService } from '../discord.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-guild-page',
  templateUrl: './guild-page.component.html',
  styleUrls: ['./guild-page.component.css'],
})
export class GuildPageComponent implements OnInit {
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
          console.log(res);

          const data: Guild = res.data;

          this.guild = data;
        } else {
          if (res.message === 'Unauthorized')
            return (window.location.href = `/dashboard`);
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
