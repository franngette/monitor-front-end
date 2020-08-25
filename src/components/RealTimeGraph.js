import React, { Component  } from 'react'
import Chart from "chart.js";

let labels = ["","","","",""];

export default class LineGraph extends Component  {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

    componentDidMount() {

        const ctx = this.chartRef.current.getContext("2d")
        const {height: graphHeight} = ctx.canvas;
        const gradient = ctx.createLinearGradient(0, 0, 0, graphHeight);
        gradient.addColorStop(0, 'rgba('+ this.props.color + ', .8)');
        gradient.addColorStop(1, 'rgba('+ this.props.color + ', .1)');
        
        const { data } = this.props;

            this.myLineChart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: this.props.name,
                                data: data,
                                lineTension: 0.5,
                                borderWidth: 4,
                                pointRadius: 1.5,
                                backgroundColor: gradient,
                                borderColor: 'rgba('+ this.props.color + ',1)',
                                pointBorderColor: 'rgba('+ this.props.color + ',1)',
                                pointHoverBackgroundColor: 'rgba('+ this.props.color + ',1)',
                                pointHoverBorderColor: 'rgba('+ this.props.color + ',1)',
                                fill: true,
                            }
                        ]
                    },
                options: {

                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                        labels: {
                            fontColor: '#fff'
                        },
                    },
                    scales: {
                        display: true,
                        yAxes: [{
                            gridLines: {
                                color: 'rgba(255, 255, 255, 0.05)',
                                },
                            ticks: {
                                beginAtZero:true,
                                fontColor: '#fff',
                                labelString: 'test'
                            },
                        }],
                        xAxes: [{
                            scaleLabel: {
                            display: true,
                            fontColor: 'rgba(255, 255, 255, 0.4)'},
                            gridLines: {
                                display: false},
                            ticks: {
                                display: true,
                                fontColor: '#fff',
                            },
                        }]
                    } 
                }
            });
    }

    componentDidUpdate() {
        //this.buildChart();
        if(this.props.update){
            let arr = this.myLineChart.data.datasets[0].data;
            if (arr.length > 4){
                arr.shift()
             }
            arr.push(this.props.newData)
            this.myLineChart.data.datasets[0].data = arr;
            this.myLineChart.update()
        }
    }

    
    render() {
        return (
                <canvas ref={this.chartRef}/>
        )
    }

}