import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pharmacy-ui',
  templateUrl: './pharmacy-ui.component.html',
  styleUrls: ['./pharmacy-ui.component.css']
})
export class PharmacyUiComponent implements OnInit {

  constructor() { }
  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  
  ngOnInit(): void {
  }

}
