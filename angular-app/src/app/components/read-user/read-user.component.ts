import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { DeleteUserComponent } from './../delete-user/delete-user.component';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.scss'],
})
export class ReadUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = true;
  displayedColumns: string[] = [
    'sno',
    'name',
    'email',
    'age',
    'gender',
    'state',
    'createdAt',
    'updatedAt',
    'update',
    'delete',
  ];
  dataSource: MatTableDataSource<User>;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsers().subscribe(
      (users: any) => {
        console.log('users=>>', users);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        this.isLoading = false;
        console.log('error=>>', error);
      }
    );
  }

  deleteUser(_id: string) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      data: _id,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.data = this.dataSource.data.filter(
          (user) => user._id !== _id
        );
      }
    });
  }
}
