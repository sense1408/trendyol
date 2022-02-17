import React, { Component } from 'react';
import './Dashboard.css';
import DateTimeRangePicker from "../DateTimeRangePicker/DateTimeRangePicker";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import LineChart from "../LineChart/LineChart";
import PerfLogo from '../img/PerfLogo.png';

const TTFB = 'TTFB';
const FCP = 'FCP';
const WINDOW_LOAD = 'WINDOW_LOAD';
const DOM_LOAD = 'DOM_LOAD';

export default class Dashboard extends Component {

  constructor (props) {
    super(props);
    const end = new Date().getTime();
    const start = new Date(new Date().getTime() - (30 * 60 * 1000)).getTime();
    this.state = {
      start: start,
      end: end,
      data: [],
      labelsStatus: false
    };
  }

  componentDidMount () {
    this.getDataFromAPI();
  }

  getDataFromAPI = () => {
    const { start, end } = this.state;
    console.log(new Date(start));
    console.log(new Date(end));
    axios.get(`http://localhost:5000`, {
      params: {
        beginTime: start,
        endTime: end
      }
    })
      .then(res => {
        console.log(res);
        const { data } = res;
        this.setState({ data })
      }).catch(err => console.log(err));
  }

  setTimeRange = (time) => {
    const { start, end } = time;
    console.log(new Date(start), new Date(end));
    this.setState({
      start: new Date(start).getTime(),
      end: new Date(end).getTime()
    }, () => {
      console.log(this.state.start, this.state.end)
    })
  }

  toggleLabels = () => {
    if ( this.state.labelsStatus ) {
      this.setState({ labelsStatus: false })
    } else {
      this.setState({ labelsStatus: true })
    }
  }

  render () {
    const { data, labelsStatus } = this.state;

    const TTFBs = data.filter(item => item.analyticType === TTFB)
    const timeTTFB = TTFBs.map(item => item.time);
    const createdAtTTFB = TTFBs.map(item => new Date(item.createdAt).toDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString());

    const FCPs = data.filter(item => item.analyticType === FCP)
    const timeFCP = FCPs.map(item => item.time);
    const createdAtFCP = FCPs.map(item => new Date(item.createdAt).toDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString());

    const WindowLoads = data.filter(item => item.analyticType === WINDOW_LOAD);
    const timeWindowLoad = WindowLoads.map(item => item.time);
    const createdAtWindowLoads = WindowLoads.map(item => new Date(item.createdAt).toDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString());

    const DOMLoads = data.filter(item => item.analyticType === DOM_LOAD);
    const timeDOMLoad = DOMLoads.map(item => item.time);
    const createdAtDOMLoad = DOMLoads.map(item => new Date(item.createdAt).toDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString());

    return (
      <div className="dashboard-container">
        <div className="logo text-center">
          <img src={PerfLogo}/>
        </div>
        <div className="header-container row">
          <div className="col-md-6 date-range-picker-container text-center">
            <DateTimeRangePicker setTimeCallback={(time) => this.setTimeRange(time)}/>
          </div>
          <div className="col-md-3 text-center">
            <Form.Check type="checkbox" onChange={() => this.toggleLabels()} label="Charts' labels"/>
          </div>
          <div className="col-md-3 text-center">
            <Button variant="success" onClick={this.getDataFromAPI}>Refresh Dashboard</Button>{' '}
          </div>
        </div>
        <div className="content-container">
          <div className="charts-container">
            <div className="col-md-6">
              <LineChart data={timeTTFB} labels={labelsStatus ? createdAtTTFB : [...Array(createdAtTTFB.length).keys()]} title={TTFB}/>
            </div>
            <div className="col-md-6">
              <LineChart data={timeFCP} labels={labelsStatus ? createdAtFCP : [...Array(createdAtFCP.length).keys()]} title={FCP}/>
            </div>
            <div className="col-md-6">
              <LineChart data={timeWindowLoad} labels={labelsStatus ? createdAtWindowLoads : [...Array(createdAtWindowLoads.length).keys()]} title={WINDOW_LOAD}/>
            </div>
            <div className="col-md-6 last-chart">
              <LineChart data={timeDOMLoad} labels={labelsStatus ? createdAtDOMLoad : [...Array(createdAtDOMLoad.length).keys()]} title={DOM_LOAD}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
