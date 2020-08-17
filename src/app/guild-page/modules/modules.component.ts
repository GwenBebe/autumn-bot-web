import { Component, OnInit, Input } from '@angular/core';
import { Guild } from '../../discord.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  @Input() guild: Guild;

  constructor() {}

  ngOnInit(): void {
    console.log(this.guild.settings);
  }
}
