import {Component, Input, OnInit} from '@angular/core';

import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {
  @Input('categoryId') categoryId: string;
  positions: Position[] = [];
  loading: boolean = false;

  constructor(private positionService: PositionsService) { }

  ngOnInit() {
    this.loading = true;
    this.positionService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }
}
