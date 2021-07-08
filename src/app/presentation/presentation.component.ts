import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  showInstructions: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.showInstructions = false;
  }

  moveToSelectedTab(tabName: string) {
    for (
      let i = 0;
      i < document.querySelectorAll('.mat-tab-label-content').length;
      i++
    ) {
      if (
        (<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i])
          .innerText == tabName
      ) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  onShowHide() {
    this.showHideInstructions();
  }

  showHideInstructions() {
    if (this.showInstructions) {
      document.getElementById("showHideButton").innerText = "Show Instructions";
      this.showInstructions = false;
    }
    else {
      document.getElementById("showHideButton").innerText = "Hide Instructions";
      this.showInstructions = true;
    }
  }

  openInNewTab(destination: string) {
    let url:string = '';
    if (destination == 'production')
    {
      url = 'http://localhost:52773/csp/healthshare/epcis/EnsPortal.ProductionConfig.zen?PRODUCTION=EPCIS.intersystems.Production'
    }
    else if (destination = 'messages') {
      url = 'http://localhost:52773/csp/healthshare/epcis/EnsPortal.MessageViewer.zen'
    }
    window.open(url, '_blank').focus();
  }

}
