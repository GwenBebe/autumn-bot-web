import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './discord.service';
import { HttpClient } from '@angular/common/http';
export type valueType =
  | 'role'
  | 'textChannel'
  | 'guildChannel'
  | 'voiceChannel'
  | 'string'
  | 'guildMember'
  | 'bannedUser'
  | 'boolean'
  | 'number'
  | 'color'
  | 'url'
  | 'image'
  | 'snowflake'
  | 'timeLength';

export type PermissionString =
  | 'CREATE_INSTANT_INVITE'
  | 'KICK_MEMBERS'
  | 'BAN_MEMBERS'
  | 'ADMINISTRATOR'
  | 'MANAGE_CHANNELS'
  | 'MANAGE_GUILD'
  | 'ADD_REACTIONS'
  | 'VIEW_AUDIT_LOG'
  | 'PRIORITY_SPEAKER'
  | 'STREAM'
  | 'VIEW_CHANNEL'
  | 'SEND_MESSAGES'
  | 'SEND_TTS_MESSAGES'
  | 'MANAGE_MESSAGES'
  | 'EMBED_LINKS'
  | 'ATTACH_FILES'
  | 'READ_MESSAGE_HISTORY'
  | 'MENTION_EVERYONE'
  | 'USE_EXTERNAL_EMOJIS'
  | 'VIEW_GUILD_INSIGHTS'
  | 'CONNECT'
  | 'SPEAK'
  | 'MUTE_MEMBERS'
  | 'DEAFEN_MEMBERS'
  | 'MOVE_MEMBERS'
  | 'USE_VAD'
  | 'CHANGE_NICKNAME'
  | 'MANAGE_NICKNAMES'
  | 'MANAGE_ROLES'
  | 'MANAGE_WEBHOOKS'
  | 'MANAGE_EMOJIS';
export interface Argument {
  name: string;
  key: string;
  type: valueType;
  description?: string;
  optional?: boolean;
  defaultVal?: string;
  acceptedValues?: string[];
  cases?: { [key: string]: string };
}

export interface CommandInfo {
  name: string; // The name of the command
  category: string; // The category of this command, used to separate commands in the help command
  description: string; // The description of the command
  aliases: string[]; // The aliases of this command, these can be used instead of the name
  args: Argument[];
  guildOnly: boolean; // Whether this command should only be usable on a guild
  NSFW: boolean;
  userPermissions: PermissionString[];
  botPermissions: PermissionString[];
}

export interface BotInfo {
  name: string;
  botId: string;
  commands: CommandInfo[];
}
@Injectable({
  providedIn: 'root',
})
export class BotService {
  static botInfo: BotInfo;
  private botinfourl = `/api/bot/info`;

  constructor(private http: HttpClient) {}

  getBotInfo(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.botinfourl);
  }
}
