import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CustomDateFormatPipe} from "../../../pipes/custom-format-date.pipe";
import {TableEventsService} from "../../../services/table-events.service";
import {TableSettings} from "../../../models/table.model";

@Component({
  selector: 'app-new-event-line',
  templateUrl: './new-event-line.html',
  styleUrls: ['./new-event-line.scss']
})
export class NewEventLineComponent {
  public customDateFormat = new CustomDateFormatPipe();
  public isSubmitted = false;
  @Input() settings?: TableSettings;
  @Output() dateChange = new EventEmitter<number>();
  @Input() componentRef!: ComponentRef<any>;

  public formGroup = this.fb.group({
    text: [null, Validators.required],
    date: [null, Validators.required]
  });

  get text(): FormControl {
    return this.formGroup.get('text') as FormControl;
  }

  get date(): FormControl {
    return this.formGroup.get('date') as FormControl;
  }

  constructor (
    public tableEventsService: TableEventsService,
    public fb: FormBuilder) {
  }

  deleteComponent() {
    this.componentRef.destroy();
  }

  saveEvent(dateValue: Date, textValue: string) {
    this.isSubmitted = true;
    if (this.text.invalid || this.date.invalid) return;
    const date = new Date(dateValue);
    const formattedDate = this.customDateFormat.transform(date);
    this.tableEventsService.saveEvent(formattedDate, textValue);
    this.formGroup.reset();
    this.isSubmitted = false;
  }

}
