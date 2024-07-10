import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ListModel } from '../../../models/list.model';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../pipe/truncate.pipe';

@Component({
  selector: 'app-view-list',
  standalone: true,
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
  imports: [CommonModule, TruncatePipe],
})
export class ViewListComponent {
  @Input() list: ListModel[] = [];
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() updateItemEvent = new EventEmitter<ListModel>();

  deleteItem(index: number) {
    this.deleteItemEvent.emit(index);
  }

  updateItem(list: ListModel, index: number) {
    const newList = { ...list, index: index };
    this.updateItemEvent.emit(newList);
  }
}
