import React from 'react';
import { CircularProgressbarWithChildren, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Spinner} from 'react-bootstrap/';
import {useSelector} from 'react-redux';

export default function Widgets(props){

    const temperature = useSelector( state => state.temperature)
    const humidity = useSelector( state => state.humidity)
    const power = useSelector( state => state.power)
    const co2 = useSelector( state => state.co2)

    const style_graph = {
        Temperature: {strokeLinecap: 'butt',pathColor: `rgb(191,0,10)`,trailColor: '#d6d6d6'},
        Humidity: {strokeLinecap: 'butt',pathColor: `rgb(13,147,255)`,trailColor: '#d6d6d6' },
        CO2: {strokeLinecap: 'butt',pathColor:`rgb(128, 128, 128)`,trailColor: '#d6d6d6'},
        Power: {strokeLinecap: 'butt',pathColor: `rgb(50, 205, 50)`,trailColor: '#d6d6d6'}
    }
    const icon_graph = {
        Temperature: <i className="fas fa-thermometer-quarter fa-2x ic-temp"></i>,
        Humidity: <i className="fas fa-tint fa-2x ic-hum"></i>,
        CO2: <i className="fas fa-cloud fa-2x ic-co2"></i>,
        Power: <i className="fas fa-bolt fa-2x ic-pow"></i>
    }

    const searchValue = (data) => {
        let value = ''
        switch (data.sensor_name) {
            case temperature.sensor_name :
                value = temperature.message;
                break;

           case humidity.sensor_name :
                value = humidity.message;
                break;

            case co2.sensor_name :
                value = co2.message;
                break;

            case power.sensor_name :
                value = power.message;
                break;
        }
        return value;
    }

    function renderWidget() {
          
        return props.data.map((data, i) => {

            let value = ''
            value = searchValue(data)

            return (
            <div className="widget-progresscircular-dash" key={i}>
                <CircularProgressbarWithChildren value = { props.data ? value.length > 0 ? value : props.data[i].value : <Spinner animation="border" variant="primary"/>} maxValue={props.data ? props.data[i].sensor_range : "100"} strokeWidth="4" 
                        styles={buildStyles(style_graph[props.data[i].sensor_name])}>
                    {icon_graph[props.data[i].sensor_name]}
                    <div>
                        <strong>{props.data[i].sensor_name}</strong>
                    </div>
                    <div style={{ fontSize: 12, marginBottom: 10, paddingTop: 10}}>
                        <strong>{props.data ? value.length > 0 ? value : props.data[i].value : <Spinner animation="border" variant="primary"/>}{props.data ? props.data[i].unit_measured: ""}</strong>
                    </div>
                </CircularProgressbarWithChildren>            
            </div>
            )
        })
    }

    return(
        <div className="widget-row-progresscircular">
            {renderWidget()}
        </div>
    )
}
