import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    ngOnInit(): void {
    }

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public mbarChartLabels:string[] = ['27/7/2019', '28/7/2019', '29/6/2019', '30/6/2019', '1/7/2019', '2/7/2019', '3/7/2019'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartColors:Array<any> = [
        {
            backgroundColor: 'rgba(105,159,177,0.2)',
            borderColor: '#37A3AA',
            pointBackgroundColor: 'rgba(105,159,177,1)',
            pointBorderColor: '#fafafa',
            pointHoverBackgroundColor: '#fafafa',
            pointHoverBorderColor: 'rgba(105,159,177)'
        }
    ];
    public barChartData:any[] = [
        {data: [55, 60, 75, 82, 56, 62, 80], label: 'ENTER'},
        // {data: [58, 55, 60, 79, 66, 57, 90], label: 'EXIT'}
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public randomize():void {
        let data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            (Math.random() * 100),
            Math.round(Math.random() * 100),
            (Math.random() * 100),
            Math.round(Math.random() * 100)];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
    }
}
