import React, { Component } from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { FormControl } from 'react-bootstrap'
import moment from "moment"

export default class DateTimeRangePicker extends Component {

  constructor (props) {
    super(props);
    let end = moment(new Date());
    let start = moment(end)
      .subtract("30", "minutes");
    this.state = {
      start: start,
      end: end
    };
  }

  applyCallback = (startDate, endDate) => {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));
    this.setState({
      start: startDate,
      end: endDate
    }, () => {
      this.props.setTimeCallback(this.state);
    });

  }

  rangeCallback = (index, value) => {
    console.log(index, value);
  }

  render () {
    let now = new Date();
    let start = moment(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let ranges = {
      "Last 30 Minutes": [ moment(now).subtract("30", "minutes"), moment(now) ],
      "Last 60 Minutes": [ moment(now).subtract("60", "minutes"), moment(now) ],
      "Last 5 Hours": [ moment(now).subtract("5", "hours"), moment(now) ],
      "Last 12 Hours": [ moment(now).subtract("12", "hours"), moment(now) ],
      "Today Only": [ moment(start), moment(end) ],
      "Yesterday Only": [
        moment(start).subtract(1, "days"),
        moment(end).subtract(1, "days")
      ],
      "3 Days": [ moment(start).subtract(3, "days"), moment(end) ],
      "5 Days": [ moment(start).subtract(5, "days"), moment(end) ]
    };
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false
    };
    let maxDate = moment(end).add(24, "hour");
    let value = `${this.state.start.format(
      "DD-MM-YYYY HH:mm"
    )} - ${this.state.end.format("DD-MM-YYYY HH:mm")}`;
    let disabled = false;
    return (
      <div>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          smartMode
          autoApply
          descendingYears
          years={[ 2010, 2020 ]}
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: "pointer" }}
            disabled={disabled}
            value={value}
            readOnly
          />
        </DateTimeRangeContainer>
      </div>
    );
  }
}
