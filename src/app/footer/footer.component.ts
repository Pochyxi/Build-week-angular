import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  arrWords = [
    'Adiener Lopez Velazquez',
    'Giandomenico Maggio',
    'Daniele Terracciano',
    'Chiara Soddu',
    'Luca Trimboli',
  ];

  showed!: string;

  constructor() {}

  ngOnInit(): void {
    let i = 0;

    while (i < this.arrWords.length) {
      if (i < this.arrWords.length) {
        setInterval(() => {
          this.showed = this.showNames(i);
        }, 1000);
      } else {
        i = 0;
      }
      i++;
    }
  }
  showNames(i: number) {
    return this.arrWords[i];
  }
}
