import { Component, OnInit } from '@angular/core';
import { DiscordService } from '../discord.service';

import { partialGuild } from '../discord.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css'],
})
export class GuildsComponent implements OnInit {
  guilds: partialGuild[];

  constructor(
    private discordService: DiscordService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getGuilds();
  }

  getGuilds() {
    this.discordService.getUserGuilds().subscribe((res) => {
      if (res.status === 'error') {
        return this.snackbar.open(`Error Loading: ${res.message}`, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }

      const data: partialGuild[] = res.data;

      const guilds = data.sort(function (x, y) {
        return x.botGuild === y.botGuild ? 0 : x.botGuild ? -1 : 1;
      });

      this.guilds = guilds;
    });
  }
}
