import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  rfID: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', rfID: 123456},
  {position: 2, name: 'Helium', rfID: 4.0026},
  {position: 3, name: 'Lithium', rfID: 6.941},
  {position: 4, name: 'Beryllium', rfID: 9.0122},
  {position: 5, name: 'Boron', rfID: 10.811},
  {position: 6, name: 'Carbon', rfID: 12.0107},
  {position: 7, name: 'Nitrogen', rfID: 14.0067},
  {position: 8, name: 'Oxygen', rfID: 15.9994},
  {position: 9, name: 'Fluorine', rfID: 18.9984},
  {position: 10, name: 'Neon', rfID: 20.1797},
];

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  listOfRooms: string[] = ['lab1', 'lab2', 'lab3', 'lab4', 'lab5'];

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['position', 'name', 'rfID'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
