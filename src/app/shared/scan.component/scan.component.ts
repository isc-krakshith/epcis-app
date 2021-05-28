import { Component, OnInit } from '@angular/core';
import { fade } from '../animation';

@Component({
  selector: 'scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
  animations: fade
})
export class ScanComponent implements OnInit {
  choice = 2;
  state = 'out';
  counter = 0;
  enableAnimation = false;
  imageSource = 'assets/img/DischargeSummary.jpg';

  ngOnInit() {
    this.imageSource = '';
  }

  onClick() {
    this.imageSource = 'assets/img/DischargeSummary.jpg';
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
  }
}
