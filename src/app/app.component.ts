import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  theme = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    const cookie: any = document.cookie.split(';').reduce((res, c) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent);
      const allNumbers = (str) => /^\d+$/.test(str);
      try {
        return Object.assign(res, {
          [key]: allNumbers(val) ? val : JSON.parse(val),
        });
      } catch (e) {
        return Object.assign(res, { [key]: val });
      }
    }, {});
    console.log(cookie.acceptedCookies);
    if (!cookie.acceptedCookies) {
      const dialogRef = this.dialog.open(CookieDialog, {
        closeOnNavigation: false,
        disableClose: true,
        hasBackdrop: false,
        position: {
          bottom: '10px',
        },
      });
    }

    this.theme = cookie.theme || '';
  }

  goHome() {
    window.location.href = '/home';
  }

  public changeTheme(theme: string) {
    document.cookie = `theme=${theme}`;
    this.theme = theme;
  }
}
@Component({
  selector: 'cookie-dialog',
  template: `This site uses cookies to log you in and keep track of your
    preferences.
    <button mat-button (click)="acceptCookies()">
      Ok
    </button>`,
})
export class CookieDialog {
  constructor(public dialogRef: MatDialogRef<CookieDialog>) {}

  acceptCookies() {
    document.cookie = 'acceptedCookies=true';
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
