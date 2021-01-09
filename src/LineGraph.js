import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
    legend: {
        display: false,
    }
};

function LineGraph() {
    const [data, setData] = useState({});
    
    const buildDataChart = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
        let date;
        for(date in data.cases){
            if (lastDataPoint){
                const newDataPoint ={
                    x: date,
                    y: date['cases'][date] - lastDataPoint
                };
                chartData.push(newDataPoint);
            }

            lastDataPoint = data[casesType][date];
        }

        return chartData
    }
    
    useEffect(() => {
        fetch("https://corona.lmao.ninja/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(data=> {
            //console.log(data)
            const chartData = buildDataChart(data);
            setData(chartData);

        })

    }, []);

    return (
        <div>
            <Line data={{
                dataset: [
                        {
                            backgroundColor:"rgba(204,16,51,0.5)",
                            borderColor:"#CC1034",
                            data: data
                        }
                    ]
                }} 
                
                options></Line>        
        </div>
    )
}

export default LineGraph
