import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'

import DateTimeRangePicker from "./DateTimeRangePicker";


configure({ adapter: new Adapter() });

describe('<DateTimeRangePicker />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DateTimeRangePicker/>)
  });

  it('should render one DateTimeRangeContainer component', () => {
    expect(wrapper.find(DateTimeRangeContainer)).toHaveLength(1);
  });
});
