import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Animation code goes here

    // Wrap every letter in a span
    let textWrapper = document.querySelector('.c2 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter' style='display:inline-block;'>$&</span>"
    ); // do not forget this display:inline-block style here

    anime.timeline({ loop: false }).add({
      targets: '.c2 .letter',
      translateY: ['1.1em', 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 100 * i,
    });
    let textWrapper1 = document.querySelector('.c1 .letters');
    textWrapper1.innerHTML = textWrapper1.textContent.replace(
      /\S/g,
      "<span class='letter' style='display:inline-block;'>$&</span>"
    );

    anime.timeline({ loop: false }).add({
      targets: '.c1 .letter',
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: (el, i) => 45 * (i + 1),
    });
  }
}
