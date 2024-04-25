import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-line',
  templateUrl: './input-line.component.html',
  styleUrls: ['./input-line.component.scss']
})
export class InputLineComponent {
  @Input() control = new FormControl(null);
  @Input() placeholder = '';
  @Input() submitted = false;
}
