import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs?: any[];
  @Input() activeTab = 0;
  @Output() activeTabChange = new EventEmitter<number>();
  onTabChange(index: number) {
    this.activeTabChange.emit(index);
  }
}
