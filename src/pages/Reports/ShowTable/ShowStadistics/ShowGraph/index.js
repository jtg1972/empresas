import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.size = 14;
const ShowGraph = ({data,labels,label,style}) => {


const backgroundColors=[]
data.forEach(e=>{
  backgroundColors.push(`rgba(${Math.random()*255},
  ${Math.random()*255},${Math.random()*255},1)`)
})
const data1 = {
  labels: labels,
  datasets: [
    {
      label: label,
      data: data,
      backgroundColor:backgroundColors
    },
  ],
  options:{
    responsive:true
 
  }
};


  return <Doughnut style={style} data={data1} />;

}

export default ShowGraph
