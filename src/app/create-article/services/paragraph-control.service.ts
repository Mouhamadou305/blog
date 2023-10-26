import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ParagraphControlService {
  toFormGroup(numberOfParagraphs : number) {
    let group: any = {};

    group["title"] = new FormControl('', Validators.required);
    group["description"] = new FormControl('', Validators.required);
    group["image"] = new FormControl('');
    for(let i=0; i<numberOfParagraphs; i++){
      group[`paragraphTitle${i}`] = new FormControl('', Validators.required);
      group[`paragraphContent${i}`] = new FormControl('', Validators.required);
    }
    return new FormGroup(group);
  }
}