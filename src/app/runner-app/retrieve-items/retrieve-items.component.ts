import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {EPCISIRISService} from '../../services/epcis-iris.service';

@Component({
  selector: 'app-retrieve-items',
  templateUrl: './retrieve-items.component.html',
  styleUrls: ['./retrieve-items.component.css']
})
export class RetrieveItemsComponent implements OnInit {
  retrieveItemsForm = new FormGroup({
    location: new FormControl('')
  })
  constructor(
    private epcisIRISservice: EPCISIRISService
  ) {
    this.retrieveItemsForm.setValue({location: 'Monkswell Ward'});
  }

  onSubmit(){}
  
  ongetItems() {
    // TODO: Use EventEmitter with form value
    console.warn(this.retrieveItemsForm.value);
    var JSONString = JSON.stringify(this.retrieveItemsForm.value)
    
    this.epcisIRISservice.retrieveItems(JSONString).subscribe((data: any) => {
      //this.reset()
      var spellId = data.EventQueryResult[0].EPCISBody.EventList.TransactionEvent[0].any[1];

      console.log("Success", spellId, "success");
      this.retrieveItemsForm.setValue({location: 'Monkswell Ward'});

    }, error => {
      console.log("There is something weird in retrieve items process", error);
    })
  }

  getItems(){
    this.ongetItems();
    console.log("Getting Items");
  }
  submitted = false;

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return;
  }
 
  reset() {
    this.retrieveItemsForm.setValue({location: ''});
    this.submitted = false;
  }

  extractInpatientSpellId(xmlstring: string): string{
    
    /*look for end of opening xml tag
    <nhs:inpatientSpellId *>* 4567890</nhs:inpatientSpellId>*/
    var openTagEndPos = xmlstring.indexOf(">");
    
    /*look for start of closing xml tag
    <nhs:inpatientSpellId>4567890 *<* /nhs:inpatientSpellId>*/
    var closeTagStartPos = xmlstring.indexOf("</");

    //inPatientSpellId is the part beween the two locations
    return xmlstring.substr(openTagEndPos+1, closeTagStartPos-openTagEndPos-1);
  }

 }

