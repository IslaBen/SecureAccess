import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServService } from '../serv.service';
import {Room} from '../Room';


// var rooms: Room[] = [
//   {position: 1, name: 'Hydrogen',state :true},
//   {position: 2, name: 'Helium',state :false},
//   {position: 3, name: 'Lithium', state :false},
//   {position: 4, name: 'Beryllium',state :true},
//   {position: 5, name: 'Boron',state :true},
//   {position: 6, name: 'Carbon',state :true},
//   {position: 7, name: 'Nitrogen',state :true},
//   {position: 8, name: 'Oxygen',state :true},
//   {position: 9, name: 'Fluorine',state :true},
//   {position: 10, name: 'Neon',state :true},
// ];


@Component({
    selector: 'app-room-management',
    templateUrl: './room-management.component.html',
    styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

    constructor(private s: ServService) { }

    ngOnInit() {
        this.getAllRooms();
    }
    private rooms :Room[];
    private addRoomInfo = {}
    displayedColumns: string[] = ['position', 'name', 'state','del'];
    private dataSource;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private delRoom(index, id) {
        this.s.delRoom(id).subscribe(
            res => {
                console.log(res.message);
                this.rooms.splice(index, 1);
                this.dataSource = new MatTableDataSource(this.rooms);
            },
            err => console.log(err.error)
        )
    }

    private getAllRooms() {
        this.s.getRooms().subscribe(
            res => {
                this.rooms = res;
                this.dataSource = new MatTableDataSource(this.rooms);
            },
            err => console.log(err.error)
        )
    }

    private addRoom() {
        this.s.addRoom(this.addRoomInfo).subscribe(
            res => {
                console.log ('donne');
                this.rooms.push(res);
                this.dataSource = new MatTableDataSource(this.rooms);
            },
            err => console.log(err.error)
        )
    }

    private change(id, state) {
        this.s.updateRoom(id, state).subscribe(
            res => console.log(res.message)
        )
    }
}
