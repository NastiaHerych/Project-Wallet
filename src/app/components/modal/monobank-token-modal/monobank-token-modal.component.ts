import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OtherBanksModalComponent } from '../other-banks-modal/other-banks-modal.component';

@Component({
  selector: "app-monobank-token-modal",
  templateUrl: "./monobank-token-modal.component.html",
  styleUrls: ["./monobank-token-modal.component.scss"],
})
export class MonobankTokenModalComponent {
  monobankToken: string;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MonobankTokenModalComponent>,
    public dialog: MatDialog
  ) {}

  connectToMonobank() {
     localStorage.setItem("monobankToken", this.monobankToken);

      this.dialogRef.close();
      const dialogRef = this.dialog.open(OtherBanksModalComponent, {
        width: "370px",
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log("The dialog was closed");
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  cancel(): void {
    this.dialogRef.close();
    this.openSnackBar("canceled", "ok");
  }
}
