import {Component, Input, OnInit} from '@angular/core';
import 'anychart';
import {Pull} from "../../model/Pull";
import * as _ from 'lodash';
import {AlertService} from "../../service/alert.service";
import {TimeRange} from "../../model/TimeRange";
import {data} from "autoprefixer";


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  @Input()
  ranges: TimeRange[] = [];

  constructor(private alertService: AlertService) {
  }

  getAllPulls() {
    this.alertService.newRanges
      .subscribe(event => {
        this.ranges = event.ranges
        this.draw()
      })
    this.alertService.getTime()
  }

  ngOnInit(): void {
    this.getAllPulls()
  }

  private draw() {
    this.ranges.map(range => {
      var date = new Date(0);
      date.setSeconds(range.duration); // specify value for SECONDS here

      range.tooltip = date.toISOString().substring(11, 19);
    })
    var dataset = anychart.data.set(this.ranges);
    var mapping = dataset.mapAs({
      x: 'day',
      value: 'duration'
    });
    console.log(this.ranges)

    // pass the mapped data to the calendar function
    var chart = anychart.calendar(mapping);

    // specify the color of the background
    chart.background('#0d1117');

    // configure a custom color scale
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(['green', 'red']);

    // set the custom color scale
    chart.colorScale(customColorScale);

    // hide the color legend
    chart.colorRange(false);

    // remove the stroke
    chart.months()
      .stroke(false)
      .noDataStroke(false);

    // set the spacing and other options
    chart.days()
      .spacing(4)
      .stroke(false)
      .noDataStroke(false)
      .noDataFill('#161b22')
      .noDataHatchFill(false);

    // set the height of the chart
    chart.listen('chartDraw', function () {
      let elementById = document.getElementById('chartContainer');
      if (elementById != null) {
        elementById.style.height = '280px';
      }
    });

    // set and customize the chart title
    var title = chart.title();
    title.enabled(true);
    title
      .text("Timetable")
      .fontSize(22)
      .fontWeight(500)
      .fontColor("#dfdfdf")
      .padding(10);

    // configure the chart tooltip
    chart.tooltip()
      .format('{%tooltip} contributions');

    // configure the inverted order of years
    chart.years().inverted(true);

    // set the container reference
    chart.container('chartContainer');

    // draw the resulting chart
    chart.draw();
  }


}
