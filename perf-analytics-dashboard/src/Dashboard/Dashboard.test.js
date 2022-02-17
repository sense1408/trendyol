import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Form } from "react-bootstrap";

import Dashboard from "./Dashboard";
import DateTimeRangePicker from "../DateTimeRangePicker/DateTimeRangePicker";
import LineChart from "../LineChart/LineChart";


configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard/>)
  });

  it('should render one DateTimeRangePicker component', () => {
    expect(wrapper.find(DateTimeRangePicker)).toHaveLength(1);
  });

  it('should render four LineChart components', () => {
    expect(wrapper.find(LineChart)).toHaveLength(4);
  });

  it('should check/uncheck label checkbox', () => {
    const mockCallBack = jest.fn();

    const checkboxWrapper = shallow(<Form.Check/>)
    checkboxWrapper.simulate('onchange');

  });
});
