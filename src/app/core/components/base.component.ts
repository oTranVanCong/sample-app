import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  template: ''
})
export class BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);
  protected formBuilder = inject(FormBuilder);
  protected snackBar = inject(MatSnackBar);
  protected dialog = inject(MatDialog);

  protected formGroup?: FormGroup;

  // These lifecycle hookers are implemented in sub-class
  protected onInit(): void {}
  protected onDestroy(): void {}
  protected onAfterViewInit(): void {}
  // ===

  protected getControl(control: string): AbstractControl | null {
    if (!this.formGroup) {
      return null;
    }

    return this.formGroup.get(control);
  }

  protected openSnackBar(message: string, action?: string, config?: MatSnackBarConfig): void {
    config = {
      ...config,
      duration: 3000
    };
    
    this.snackBar.open(message, action, config);
  }

  protected openDialog(message: string): MatDialogRef<any, any> {
    return this.dialog.open(DialogComponent, {
      data: { message },
    });
  }

  public ngOnInit() {
    this.onInit();
  }

  public ngAfterViewInit(): void {
    this.onAfterViewInit();
  }

  public ngOnDestroy() {
    this.onDestroy();
  }
}
