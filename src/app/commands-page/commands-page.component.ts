import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { BotService, BotInfo, CommandInfo } from '../bot.service';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';

interface Category {
  name: string;
  commands: CommandInfo[];
}

@Component({
  selector: 'app-commands-page',
  templateUrl: './commands-page.component.html',
  styleUrls: ['./commands-page.component.scss'],
})
export class CommandsPageComponent implements OnInit {
  public botInfo: BotInfo;
  public filteredCommands: CommandInfo[];
  public categories: Category[] = [];
  commands: CommandInfo[];
  searchBox = new FormControl('');
  selected = new FormControl(0);

  constructor(private botService: BotService) {}

  ngOnInit(): void {
    this.searchBox.valueChanges.subscribe(() => {
      this.filterCommands();
    });
    this.botService.getBotInfo().subscribe((response) => {
      if (response.status === 'success') {
        this.botInfo = response.data;
        this.commands = this.botInfo.commands;
        this.filteredCommands = this.botInfo.commands;
        console.log(this.botInfo.name);

        for (let i = 0; i < this.commands.length; i++) {
          const command = this.commands[i];
          const category = this.categories.find(
            (c) => c.name === command.category
          );
          if (!category) {
            this.categories.push({
              name: command.category,
              commands: [command],
            });
          } else {
            category.commands.push(command);
          }
        }
      }
    });
  }

  generateUsage(command: CommandInfo): string {
    const usages = command.args.map(
      (arg) =>
        `${arg.optional ? '[' : '<'}${
          arg.acceptedValues ? arg.acceptedValues.join(' | ') : arg.name
        }${arg.optional ? ']' : '>'}`
    );

    return '-' + command.name + ' ' + usages.join(' ');
  }

  filterCommands() {
    const search = this.searchBox.value;
    this.selected.setValue(0);
    this.filteredCommands = this.commands.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase() === search.toLowerCase()
    );
  }
}
