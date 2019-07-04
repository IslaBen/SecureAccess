import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {User} from '../User';
import {Room} from '../Room';
import {accessLog} from '../accessLog';
import {ServService} from '../serv.service';

export interface PeriodicElement {
    name: string;
    room: string;
    time: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Youcef', room: "lab1", time: '12/08/2019'},
//   { name: 'Taamma', room: "lab4", time: '12/08/2019'},
//   { name: 'Baba', room: "lab6", time: '12/08/2019'},
//   { name: 'Dadi', room: "lab9", time: '12/08/2019'},
//   { name: 'Hamidi', room: "lab10", time: '12/08/2019'},
//   { name: 'Benkhelifa', room: "lab12", time: '12/08/2019'},
//   { name: 'Mecheref', room: "lab14", time: '12/08/2019'},
//   { name: 'Oussama', room: "lab15", time: '12/08/2019'},
//   { name: 'Rabie', room: "lab18", time: '12/08/2019'},
//   { name: 'Islam', room: "lab20", time: '12/08/2019'},
// ];

@Component({
    selector: 'app-accesslog',
    templateUrl: './accesslog.component.html',
    styleUrls: ['./accesslog.component.css']
})
export class AccesslogComponent implements OnInit {


    private logs : accessLog[];
    private rooms: Room[];
    private dataSource;

    constructor(private s: ServService) { }

    ngOnInit() {
        this.getAllLogs();
    }

    displayedColumns: string[] = ['name', 'room', 'time', 'del'];

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private getAllLogs() {
        this.s.getLogs().subscribe(
            res => {
                this.logs = res;
                for (const log of this.logs) {
                    let person = this.s.getPerson(log.person).subscribe(
                        res => this.logs[this.logs.indexOf(log)].person = res.lastName + ' ' + res.name,
                        err => console.log(err.error)
                    );
                    let room = this.s.getRoom(log.door).subscribe(
                        res => this.logs[this.logs.indexOf(log)].door = res.position + ' ' + res.name,
                        err => console.log(err.error)
                    );
                }
                this.dataSource = new MatTableDataSource(this.logs);
            },
            err => console.log(err.error)
        )
    }


    private delRoom(index, id) {
        this.s.delAccessLog(id).subscribe(
            res => {
                console.log(res.message);
                this.logs.splice(index, 1);
                this.dataSource = new MatTableDataSource(this.logs);
            },
            err => console.log(err.error)
        )
    }
}
