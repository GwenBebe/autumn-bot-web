import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Input() prefix: string;

  constructor() {}

  ngOnInit(): void {}

  async upload(): Promise<string> {
    return 'uploaded';
  }
}
