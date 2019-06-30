import { Component, OnInit } from '@angular/core';

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

}
