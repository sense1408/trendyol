import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
  console.log(props);
  const [ data, setData ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ labels, setLabels ] = useState([]);
  const [ label, setLabel ] = useState('');


  useEffect(() => {
    setData(props.data);
    setTitle(props.title);
    setLabels(props.labels);
    setLabel(props.label);
  }, [ props.data, props.title, props.labels, props.label ]); //ComponentDidMount


  const state = {
    labels,
    datasets: [
      {
        label,
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data
      }
    ]
  }
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20
          },
          legend: {
            display: !!label,
            position: 'bottom'
          }
        }}
      />
    </div>
  );
}

export default LineChart;
