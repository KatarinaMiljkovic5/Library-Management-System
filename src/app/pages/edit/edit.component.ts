import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/helpers/utils';
import { BookService } from 'src/app/services/book'; 

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilService: UtilService
    ) { 
      this.bookForm = this.fb.group({
        title: '',
        author: '',
        publisher: '',
        year: '',
        url: '',
      });
    }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        this.bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              this.utilService.openSnackBar('Book detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.bookService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            this.utilService.openSnackBar('Book added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
