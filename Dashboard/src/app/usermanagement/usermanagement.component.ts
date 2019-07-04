import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServService } from '../serv.service';
import {User} from '../User';
import {Room} from '../Room';

@Component({
    selector: 'app-usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.css']
})

export class UsermanagementComponent implements OnInit {

    private users : User[];
    private rooms: Room[];
    private dataSource;
    addUserInfo = {};
    selectedRooms: string[] = [];

    constructor(private s: ServService) { }

    ngOnInit() {
        this.getAllUsers();
        this.getAllRooms();
    }

    displayedColumns: string[] = ['name', 'lastName', 'rfID'];


    private applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private getAllUsers() {
        this.s.getUsers().subscribe(
            res => {
                this.users = res;
                this.dataSource = new MatTableDataSource(this.users);
            },
            err => console.log(err.error)
        )
    }

    private addUser() {
        this.addUserInfo['rooms'] = this.selectedRooms;
        console.log(this.addUserInfo);
        this.s.addUser(this.addUserInfo).subscribe(
            res => {
                console.log ('donne');
                this.users.push(res);
                this.dataSource = new MatTableDataSource(this.users);
            },
            err => console.log(err. error)
        )
    }

    private  delUser(index) {
        this.s.delUser(this.dataSource[index]._id).subscribe(
            res => {
                console.log('deleted');
                this.users.splice(index, 1);
            },
            err => console.log(err.error)
        )
    }

    private getAllRooms() {
        this.s.getRooms().subscribe(
            res => this.rooms = res,
            err => console.log(err.error)
        )
    }

    private onRoomSelected(event){
        console.log(this.selectedRooms);
    }


}
