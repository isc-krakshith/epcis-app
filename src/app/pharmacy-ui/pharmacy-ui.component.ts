import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pharmacy-ui',
  templateUrl: './pharmacy-ui.component.html',
  styleUrls: ['./pharmacy-ui.component.css']
})
export class PharmacyUiComponent implements OnInit {

  constructor() { }
  isScan = false;
  isComingSoon = false;

  ngOnInit(): void {
  }

  loadContent(selection: String)
  {
    if (selection == 'scan') {
      this.isComingSoon = false;
      this.isScan = true;
    }
    else if (selection == 'comingsoon'){
     this.isScan = false;
     this.isComingSoon = true;
    }
  }

}
