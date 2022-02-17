import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, render } from "@testing-library/react";

import LineChart from "./LineChart";
import { Line } from 'react-chartjs-2';

configure({ adapter: new Adapter() });

const data = [];
const title = "";
const labels = [];
const label = "";

describe('<LineChart />', () => {
  let wrapper;
  let props = {
   data, title, labels, label
  }

  window.HTMLCanvasElement.prototype.getContext = () => {}

  beforeEach(() => {
    wrapper = shallow(<LineChart {...props}/>);
    const { rerender } = render(<LineChart {...props} />);
    rerender(<LineChart {...props}/>)
  });

  afterEach(cleanup);

  it('should render one Line component', () => {

    expect(wrapper.find(Line)).toHaveLength(1);
  });

});
