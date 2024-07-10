import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ViewListComponent } from '../view-list/view-list.component';
import type { ListModel } from '../../../models/list.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-list',
  standalone: true,
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css'],
  imports: [ReactiveFormsModule, ViewListComponent, CommonModule],
})
export class CreateListComponent implements OnInit {

  listForm: FormGroup;
  list: ListModel[] = [];
  title?: FormControl;
  description?: FormControl;
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.listForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ])
    })

  }

  ngOnInit(): void {
      this.listForm?.valueChanges.subscribe((value) => {
        // console.log("value ::: ", value);
      })
  }


  createListHandler = () => {

    if (this.listForm?.valid) {
      const newItem: ListModel = {
        ...this.listForm.value,
        date: new Date(),
      };

      if (this.isEditing && this.editingIndex !== null) {
        this.list[this.editingIndex] = newItem;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.list.unshift(newItem);
      }

      this.listForm.reset();
    }
  };

  onDeleteItem(index: number) {
    this.list.splice(index, 1);
  }

  onUpdateItem(item: ListModel) {

    this.title?.setValue(item.title);
    this.description?.setValue(item.description);
    this.isEditing = true;
    this.editingIndex = Number(item.index);
  }
}
