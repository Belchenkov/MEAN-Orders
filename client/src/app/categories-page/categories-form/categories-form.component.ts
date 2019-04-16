import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";

import {CategoriesService} from "../../shared/services/categories.service";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";

  @Component({
    selector: 'app-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss']
  })
  export class CategoriesFormComponent implements OnInit {
    isNew: boolean = true;
    form: FormGroup;

    constructor(
      private route: ActivatedRoute,
      private categoryService: CategoriesService
      ) { }

    ngOnInit() {
      this.form = new FormGroup({
        name: new FormControl(null, Validators.required)
      });

      // Old pattern
      /*this.route.params.subscribe((params: Params) => {
        if (params['id']) {
          // Edit Category
          this.isNew = false;
        }
      });*/

      this.form.disable();

      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
                      if (params['id']) {
                        this.isNew = false;
                        return this.categoryService.getById(params['id']);
                      }
                      return of(null);
            }
          )
        )
        .subscribe(
          category => {
            if (category) {
              this.form.patchValue({
                name: category.name
              });
              MaterialService.updateTextFields();
            }
            this.form.enable();
          },
          error => MaterialService.toast(error.error.message)
        )
    }

    onSubmit() {

    }

  }
