import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User, Users } from 'src/app/shared/models/user.model';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  id: User["id"];
  users: User[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar', 'deltebtn'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserServiceService) {
     
  
  }

  ngOnInit(){
    this.userService.getUsers().subscribe((res: Users) => {
      this.users = res.data;
      console.log(this.users);

      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 }
   onUserDelete(user: User){
    this.userService.deleteUsers(user.id).subscribe((res: Users) => console.log("You've removed" , res))
   }
}

