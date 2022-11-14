import { Component, OnInit } from '@angular/core';
import { Iholiday } from 'src/app/interfaces/iholiday';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidaysList: Iholiday[] = []
  constructor(
    private holidayService : HolidayService
  ) { }

  ngOnInit(): void {
    this.holidayService.getHolodays().subscribe((data: any) => {
      this.holidaysList = data;
      console.log("holidays: "+this.holidaysList);
    });
  }



  handleDelete(id:any){
    const observer = {
      next: () => {
        console.log('removed succesfully');
        this.holidayService.getHolodays().subscribe((data: any) => {
          this.holidaysList = data;
        });
      },
      error: (err: Error) => alert(err.message),
    };
    this.holidayService.deleteHoliday(id).subscribe(observer);
  }

}
