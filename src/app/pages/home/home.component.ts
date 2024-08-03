import { Component, OnInit, ViewChild} from '@angular/core';
import { BookService } from 'src/app/services/book';
import { Book } from 'src/app/interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/helpers/utils';
import { EditComponent } from '../edit/edit.component';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/store/userStore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'author', 'publisher', 'year', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private bookService: BookService,
    private utilService: UtilService,
    private router: Router,
    public userStore: UserStore
    ) {};

  ngOnInit() {
    this.getBooksData();
  }

  openAddEditBookForm() {
    const dialogRef = this.dialog.open(EditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBooksData();
        }
      },
    });
  }

  getBooksData() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBook(id: any) {
    this.bookService.deleteBook(id).subscribe({
      next: (res) => {
        this.utilService.openSnackBar('Book deleted!', 'done');
        this.getBooksData();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBooksData();
        }
      },
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}