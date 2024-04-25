import {
  Component,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public submitted = false;
  constructor (
    public fb: FormBuilder,
    public calendarService: CalendarService) {}

  public formGroup: any = this.fb.group({
    name: [null, Validators.required],
    addresses: this.fb.array([
      this.fb.group({
        address: ['', Validators.required],
      })
    ])
  });

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }
  getControls(control: FormGroup, path: string): FormControl[] | []  {
    const formArray = control.get(path) as FormArray;
    if (formArray) {
      return formArray.controls as FormControl[];
    } else {
      return [];
    }
  }

  getAddressControl(formGroup: FormGroup, index: number): FormControl  {
    return (formGroup.get('addresses') as FormArray).at(index).get('address') as FormControl;
  }
  getPhoneControls(formGroup: FormGroup, index: number): FormControl[] | [] {
    const addressesArray = formGroup.get('addresses') as FormArray;
    const addressGroup = addressesArray.at(index) as FormGroup;
    const phonesArray = addressGroup.get('phones') as FormArray;
    if (phonesArray) {
      return phonesArray.controls as FormControl[];
    }
    return [];
  }

  addPhone(addressIndex: number): void {
    const addresses = this.formGroup.get('addresses') as FormArray;
    const addressesGroup = addresses.at(addressIndex) as FormGroup;
    const phonesArray = addressesGroup.get('phones') as FormArray;
    if (!phonesArray) {
      addressesGroup.addControl('phones', this.fb.array([this.fb.control('', Validators.required)]));
    } else {
      phonesArray.push(this.fb.control('', Validators.required));
    }
  }

  removePhone(addressIndex: number, phoneIndex: number): void {
    const addresses = this.formGroup.get('addresses') as FormArray;
    const addressGroup = addresses.at(addressIndex) as FormGroup;
    const phonesArray = addressGroup.get('phones') as FormArray;

    if (phonesArray) {
      phonesArray.removeAt(phoneIndex);
    }
  }

  addAddress(): void{
    const addresses = this.formGroup.get('addresses') as FormArray;
    addresses.push(this.fb.group({
      address: ['', Validators.required],
    }));
  }

  removeAddress(i: number){
    this.formGroup.get('addresses').removeAt(i);
  }

  send() {
    this.submitted = true;
    if (this.formGroup.invalid) return;
    this.submitted = false;
    const data = this.formGroup.value;
    console.log(data)
    this.formGroup.reset();
  }
}
