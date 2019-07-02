import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../Room';


const ELEMENT_DATA: Room[] = [
  {position: 1, name: 'Hydrogen',state :true},
  {position: 2, name: 'Helium',state :false},
  {position: 3, name: 'Lithium', state :false},
  {position: 4, name: 'Beryllium',state :true},
  {position: 5, name: 'Boron',state :true},
  {position: 6, name: 'Carbon',state :true},
  {position: 7, name: 'Nitrogen',state :true},
  {position: 8, name: 'Oxygen',state :true},
  {position: 9, name: 'Fluorine',state :true},
  {position: 10, name: 'Neon',state :true},
];

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['position', 'name', 'state','del'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
