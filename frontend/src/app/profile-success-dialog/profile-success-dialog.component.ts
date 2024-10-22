import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-profile-success-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './profile-success-dialog.component.html',
  styleUrl: './profile-success-dialog.component.scss'
})

export class ProfileSuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<ProfileSuccessDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }
}
