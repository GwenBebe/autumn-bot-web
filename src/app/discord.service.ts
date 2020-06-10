import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type Snowflake = string;

type premiumType = 0 | 1 | 2;

export interface GuildSettings {
  guild: string;
  general?: {
    prefix?: string;
    deleteCommands?: boolean;
    memberRole?: string;
    memeResponses?: boolean;
  };
  moderation?: {
    enabled?: boolean;
    modLog?: string;
    warnExpire?: number;
    mutedRole?: string;
  };
  verification?: {
    enabled?: boolean;
    staffRole?: string;
    nonVerifiedRole?: string;
    nonVerifiedChannels?: string[];
    verifyChannel?: string;
    manualVerify?: boolean;
    modVerifyChannel?: string;
    pingStaff?: boolean;
    verifyMessage?: string;
    denyMessage?: string;
    acceptMessage?: string;
  };
  welcome?: {
    enabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    profileColor?: string;
    profileBackground?: string;
    welcomeChannel?: string;
  };
}
export interface User {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: premiumType;
  public_flags?: number;
}

export type guildFeatures =
  | 'INVITE_SPLASH'
  | 'VIP_REGIONS'
  | 'VANITY_URL'
  | 'VERIFIED'
  | 'PARTNERED'
  | 'PUBLIC'
  | 'COMMERCE'
  | 'NEWS'
  | 'DISCOVERABLE'
  | 'FEATURABLE'
  | 'ANIMATED_ICON'
  | 'BANNER'
  | 'PUBLIC_DISABLED'
  | 'WELCOME_SCREEN_ENABLED';

export interface partialGuild {
  id: Snowflake;
  name: string;
  icon: string;
  owner?: boolean;
  botGuild?: boolean;
  permissions?: number;
}

export interface Role {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: number;
  managed: boolean;
  mentionable: boolean;
}

export interface Emoji {
  id?: Snowflake;
  name?: string;
  roles?: Snowflake[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export type overwriteType = 'role' | 'member';

type guildChannel =
  | 'GUILD_TEXT'
  | 'GUILD_VOICE'
  | 'GUILD_CATEGORY'
  | 'GUILD_NEWS'
  | 'GUILD_STORE';

type dmChannel = 'GROUP_DM' | 'DM';

export type channelType = guildChannel | dmChannel;

export interface Overwrite {
  id: Snowflake;
  type: overwriteType;
  allow: number;
  deny: number;
}

export interface Channel {
  id: Snowflake;
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  guild_id?: Snowflake;
  position?: number;
  permissions_overwrites?: Overwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: Snowflake;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: User[];
  icon?: string;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  parent_id?: Snowflake;
}

export interface Guild extends partialGuild {
  splash?: string;
  discovery_splash?: string;
  owner_id: Snowflake;
  region: string;
  afk_channel_id?: Snowflake;
  afk_timeout: number;
  embed_enabled?: boolean;
  embed_channel_id?: Snowflake;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: Role[];
  emojis: Emoji[];
  channels: Channel[];
  features: guildFeatures[];
  mfa_level: number;
  application_id?: Snowflake;
  widget_enabled?: boolean;
  widget_channel_id?: Snowflake;
  system_channel_id?: Snowflake;
  system_channel_flags: number;
  rules_channel_id?: number;
  settings: GuildSettings;
  max_presences?: number;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: Snowflake;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
}
export interface ApiResponse {
  status: 'success' | 'error';
  statusCode: number;
  data: any;
  message: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private userinfoUrl = `/api/discord/userinfo`;
  private userguildsUrl = `/api/discord/userguilds`;
  private guildUrl = (guild: string) => {
    return `/api/discord/guild/${guild}`;
  };
  private updateUrl = (guild: string) => {
    return `/api/discord/update/${guild}`;
  };

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<ApiResponse> {
    const options = {
      withCredentials: true,
    };

    return this.http.get<ApiResponse>(this.userinfoUrl, options);
  }

  getUserGuilds(): Observable<ApiResponse> {
    const options = {
      withCredentials: true,
    };

    return this.http.get<ApiResponse>(this.userguildsUrl, options);
  }

  getGuild(guild: string): Observable<ApiResponse> {
    const options = {
      withCredentials: true,
    };

    return this.http.get<ApiResponse>(this.guildUrl(guild), options);
  }

  updateGuild(
    guild: string,
    module: string,
    settings: GuildSettings
  ): Observable<ApiResponse> {
    const body = {
      guild: guild,
      module: module,
      settings: settings,
    };

    try {
      return this.http.post<ApiResponse>(this.updateUrl(guild), body, {
        responseType: 'json',
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
