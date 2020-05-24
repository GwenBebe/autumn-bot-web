import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

type Snowflake = string;

type premiumType = 0 | 1 | 2;

export interface userinfo {
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

export interface response {
  status: number;
  message: string;
  data: userinfo | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private userinfoUrl = `http://localhost:3000/api/discord/userinfo`;

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<response> {
    const options = {
      withCredentials: true,
    };

    return this.http.get<response>(this.userinfoUrl, options);
  }
}
