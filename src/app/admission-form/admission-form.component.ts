import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {EPCISIRISService} from '../services/epcis-admit-iris.service';

@Component({
  providers:[
    EPCISIRISService],
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css']
})
export class AdmissionFormComponent implements OnInit{
  admitForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mrn: new FormControl(''),
    date: new FormControl ('')
  })
  constructor(
    private epcisIRISservice: EPCISIRISService
  ) {
    this.admitForm.setValue({firstName:'Jane', lastName:'Doe', mrn: 'T918273', date: (new Date().toISOString())});

   }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.admitForm.value);
    var JSONString = JSON.stringify(this.admitForm.value)
    
    this.epcisIRISservice.saveRequest(JSONString).subscribe((data: any) => {
      this.reset()
      console.log("Success", data, "success");

    }, error => {
      console.log("There was an error in admit process", error);
    })
  }

  submit(){
    console.log("submitting");
  }
  submitted = false;

  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return;
  }

  reset() {
    this.admitForm.setValue({firstName:'', lastName:'', mrn: '', date:''});
    this.submitted = false;
  }
}
