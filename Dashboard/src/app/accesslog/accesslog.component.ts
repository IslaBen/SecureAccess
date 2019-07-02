import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccessLog } from '../AccessLog';



const ELEMENT_DATA: AccessLog[] = [
  { name: 'Youcef', room: "lab1", time: '12/08/2019'},
  { name: 'Taamma', room: "lab4", time: '12/08/2019'},
  { name: 'Baba', room: "lab6", time: '12/08/2019'},
  { name: 'Dadi', room: "lab9", time: '12/08/2019'},
  { name: 'Hamidi', room: "lab10", time: '12/08/2019'},
  { name: 'Benkhelifa', room: "lab12", time: '12/08/2019'},
  { name: 'Mecheref', room: "lab14", time: '12/08/2019'},
  { name: 'Oussama', room: "lab15", time: '12/08/2019'},
  { name: 'Rabie', room: "lab18", time: '12/08/2019'},
  { name: 'Islam', room: "lab20", time: '12/08/2019'},
];

@Component({
  selector: 'app-accesslog',
  templateUrl: './accesslog.component.html',
  styleUrls: ['./accesslog.component.css']
})
export class AccesslogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['name', 'room', 'time'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
