import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialInstanse, MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  positions: Position[] = [];
  loading: boolean = false;
  modal: MaterialInstanse;
  form: FormGroup;

  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.loading = true;

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.positionService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  onSelectPosition(position: Position) {
    this.modal.open();
  }

  onAddPosition() {
    this.modal.open();
  }

  onSubmit() {
    this.form.disable();
  }

  onDeletePosition(position: Position) {

  }

  onCancel() {
    this.modal.close();
  }
}
