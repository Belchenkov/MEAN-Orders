import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

import {CategoriesService} from "../../shared/services/categories.service";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/interfaces";

  @Component({
    selector: 'app-categories-form',
    templateUrl: './categories-form.component.html',
    styleUrls: ['./categories-form.component.scss']
  })
  export class CategoriesFormComponent implements OnInit {
    isNew: boolean = true;
    form: FormGroup;
    @ViewChild('inputFile') inputRef: ElementRef;
    image: File;
    imagePreview;
    category: Category;

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
          (category: Category) => {
            if (category) {
              this.category = category;
              this.form.patchValue({
                name: category.name
              });
              this.imagePreview = category.imageSrc;
              MaterialService.updateTextFields();
            }
            this.form.enable();
          },
          error => MaterialService.toast(error.error.message)
        )
    }

    triggerClick() {
      this.inputRef.nativeElement.click();
    }

    onFileUpload(event: any) {
      const file = event.target.files[0];
      this.image = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }

    onSubmit() {
      let obs$;

      this.form.disable();

      if (this.isNew) {
        // create
        obs$ = this.categoryService.create(this.form.value.name, this.image);
      } else {
        // update
        obs$ = this.categoryService.update(this.category._id, this.form.value.name, this.image);
      }

      obs$.subscribe(
        category => {
          this.category = category;
          MaterialService.toast('Изменения сохранены!');
          this.form.enable();
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      )
    }

  }
