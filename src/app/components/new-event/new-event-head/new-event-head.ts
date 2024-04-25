import {
  Component,
  Input,
} from '@angular/core';
import {TableSettings} from "../../../models/table.model";

@Component({
  selector: 'app-new-event-head',
  templateUrl: './new-event-head.html',
  styleUrls: ['./new-event-head.scss']
})
export class NewEventHeadComponent {
  @Input() settings?: TableSettings;
}
