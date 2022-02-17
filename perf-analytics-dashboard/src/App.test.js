import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from "./App";
import Dashboard from "./Dashboard/Dashboard";


configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>)
  });

  it('should render just one Dashboard component', () => {
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  });
});
