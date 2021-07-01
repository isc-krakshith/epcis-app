import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-runner-app',
  templateUrl: './runner-app.component.html',
  styleUrls: ['./runner-app.component.css']
})
export class RunnerAppComponent implements OnInit {

  constructor() { }
  isIdentifyPigeonHole = false;
  isIdentifyWard = false;
  isRetrieveItems = false;
  isComingSoon = false;

  ngOnInit(): void {
  }

  loadContent(selection: String)
  {
    if (selection == 'identifyPigeonHole'){
      this.isComingSoon = false;
      this.isIdentifyPigeonHole=true;
      this.isIdentifyWard = false;
      this.isRetrieveItems = false;
    }
    else if (selection == 'identifyWard'){
      this.isIdentifyPigeonHole=false;
      this.isIdentifyWard = true;
      this.isComingSoon = false;
      this.isRetrieveItems = false;
    }
    else if (selection == 'retrieveItems'){
      this.isIdentifyPigeonHole=false;
      this.isIdentifyWard = false;
      this.isComingSoon = false;
      this.isRetrieveItems = true;
    }
    else if (selection == 'comingsoon'){
      this.isIdentifyPigeonHole=false;
      this.isIdentifyWard = false;
      this.isComingSoon = true;
      this.isRetrieveItems = false;
    }
  }
}
