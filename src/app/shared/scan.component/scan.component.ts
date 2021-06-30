import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../animation';

import {EPCISIRISService} from '../../services/epcis-iris.service';
@Component({
  providers:[
    EPCISIRISService],
  selector: 'scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
  animations: fade
})
export class ScanComponent implements OnInit {
  @Input() function: string;
  choice = 2;
  state = 'out';
  counter = 0;
  enableAnimation = false;
  imageSource = '';
  dischargeImageSource = 'assets/img/DischargeSummary.jpg';
  TTABagImageSource = 'assets/img/LocationBarcode.jpg';
  constructor(
    private epcisIRISservice: EPCISIRISService
  ){}

  ngOnInit() {
    this.imageSource = ''
  }

  onClick() {
    this.chooseImage();
    this.enableAnimation = true;
    //this.counter = 0;
    this.toggleState();
  }

  chooseImage() {
    if (this.function == "discharge")
    {
      this.imageSource = this.dischargeImageSource;
    }
    else if (this.function == "pigeonHole")
    {
      this.imageSource = this.TTABagImageSource;
    }
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
    if (this.counter == 2)
    {
      this.submit();
    }
  }

  onSubmit(){}

  submit() {
    if (this.function == "discharge")
    {
      this.epcisIRISservice.linkDischarge().subscribe((data: any) => {
        //this.reset()
        console.log("Link Discharge", data, "success");

      }, error => {
        console.log("There was an error in link discharge process", error);
      })
    }
    else 
    {
      this.epcisIRISservice.linkPigeonHole().subscribe((data: any) => {
        //this.reset()
        console.log("Link Pigeonhole", data, "success");

      }, error => {
        console.log("There was an error in link pigeonhole process", error);
      }) 
    }
  }
}
