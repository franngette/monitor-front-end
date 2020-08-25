import React, { Component  } from 'react'
import Chart from "chart.js";

export default class LineGrap extends Component  {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
      }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {


        const { data } = this.props;

        const ctx = this.chartRef.current.getContext("2d")
        const {height: graphHeight} = ctx.canvas;
        const gradient = ctx.createLinearGradient(0, 0, 0, graphHeight);
        gradient.addColorStop(0, 'rgba('+ this.props.color + ', .8)');
        gradient.addColorStop(1, 'rgba('+ this.props.color + ', .1)');
        
        if (typeof this.myLineChart !== "undefined")  this.myLineChart.destroy();

          this.myLineChart = new Chart(ctx, {
            type: "line",
                    data: {
                        labels: this.props.label,
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
    

    render() {
        return (
                <canvas ref={this.chartRef}/>
        )
    }

}