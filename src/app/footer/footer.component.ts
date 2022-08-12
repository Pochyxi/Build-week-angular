import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  showed!: string;
  arrWords = [
    'Adiener Lopez Velazquez',
    'Giandomenico Maggio',
    'Daniele Terracciano',
    'Chiara Soddu',
    'Luca Trimboli',
  ];
  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.showed =
        this.arrWords[Math.floor(Math.random() * this.arrWords.length)];
    }, 1000);
  }
}
