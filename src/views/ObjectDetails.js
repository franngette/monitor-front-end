import React, { Fragment, useState, useEffect } from 'react';
import Container from '../components/Container';
import { useLocation } from "react-router-dom";
import { dataService } from '../services/monitorServices';
import { Row, Col, Card, Accordion, Spinner} from 'react-bootstrap/';
import '../App.css';
import { CircularProgressbarWithChildren, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useSelector} from 'react-redux';
import LineGrap from '../components/LineGraph'

var cont = 0;

export default function ObjectDetail(){

    let location = useLocation ();

    const humidity = useSelector( state => state.humidity.message)
    const temperature = useSelector( state => state.temperature.message)
    const power = useSelector( state => state.power.message)

    const [object, setObject] = useState(location.state.node);
    const [dataSensor, setDataSensor] = useState();
    const [domX, setDomX] = useState();
    const [domY, setDomY] = useState();
    const [labelData, setLabelData] = useState();
    const [color, setColor] = useState("191,0,10");

    var stop = true;
    
    const sensorsValue = async (object) => {
        let res;
        res =  await dataService.getSensorValue(object.id);
        setDataSensor(res.data)
        cont = cont + 1;
        stop = false;
        }
        if (cont == 0){
            sensorsValue(object)
        }

    const getGrapData = async (hours, sensor_id, labelData) => {
        let res;
        res = await dataService.getDataLimit(object.id, sensor_id, hours);
        setDomX(res.x);
        setDomY(res.y);
        setLabelData(labelData);
    }
    
    useEffect( () => {
    } 
    ,[stop])
 
        return (
        <Fragment>
        <Container>
            <div className="card-bg mb-4 container-2col">
                <div className="card-obj col-g-1 m-4 p-4">
                    <h3 className="p-4"><b>{object.object_name + " detail"}</b></h3>
                    <p><b>Address:</b> {object.adress}</p>
                    <p><b>Contact: </b>{object.contact}</p>                            
                    <p><b>Coordinates: </b>{object.lattitude} , {object.longitude}</p>
                </div>
            
                <div className="col-g-2 widget-row-progresscircular">
                    <div className="widget-progresscircular-dash">
                        <CircularProgressbarWithChildren value={dataSensor ? humidity ? humidity : dataSensor[1].value : <Spinner animation="border" variant="primary" />} strokeWidth="4" 
                            styles={buildStyles({strokeLinecap: 'butt',pathColor: `rgb(13,147,255)`,trailColor: '#d6d6d6' } )}>
                        <i className="fas fa-tint fa-2x hum-color"></i>
                        <div>
                            <strong>Humidity</strong>
                        </div>
                        <div style={{ fontSize: 12, marginBottom: 10, paddingTop: 10}}>
                            <strong>{dataSensor ? humidity ? humidity : dataSensor[1].value : <Spinner animation="border" variant="primary" />}{dataSensor ? dataSensor[1].unit_measured: ""}</strong>
                        </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    <div className="widget-progresscircular-dash">
                        <CircularProgressbarWithChildren value={dataSensor ? temperature ? temperature : dataSensor[0].value : <Spinner animation="border" variant="primary" />}maxValue="125" strokeWidth="4"
                        styles={buildStyles({strokeLinecap: 'butt',pathColor: `rgb(191,0,10)`,trailColor: '#d6d6d6'})}>
                        <i className="fas fa-thermometer-quarter fa-2x ic-temp"></i>
                        <div>
                            <strong>Temperature</strong>
                        </div>
                        <div style={{ fontSize: 12, marginBottom: 10, paddingTop: 10}}>
                            <strong>{dataSensor ? temperature ? temperature : dataSensor[0].value : <Spinner animation="border" variant="primary" />}{dataSensor ? dataSensor[0].unit_measured: ""}</strong>
                        </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    <div className="widget-progresscircular-dash">
                        <CircularProgressbarWithChildren value={dataSensor ? power ? power : dataSensor[2].value : <Spinner animation="border" variant="primary" />} maxValue="1000" strokeWidth="4"
                        styles={buildStyles({strokeLinecap: 'butt',pathColor: `#007bff`,trailColor: '#d6d6d6'})}>
                        <i className="fas fa-bolt fa-2x text-primary"></i>
                        <div>
                            <strong>Power</strong>
                        </div>
                        <div style={{ fontSize: 12, marginBottom: 10, paddingTop: 10}}>
                            <strong>{dataSensor ? power ? power : dataSensor[2].value : <Spinner animation="border" variant="primary" />}{dataSensor ? dataSensor[2].unit_measured: ""}</strong>
                        </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>

            <Accordion defaultActiveKey="1">
            
            <div className="card-bg">
            <Fragment>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                <h6 className="font-weight-bold">Graphs</h6>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="1" >
                <Row>
                    <Col sm={3} className="m-4 ">

                        <ul className="nav nav-sns nav-pills m-4" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onClick={(e)=>{setColor("191,0,10")}}>Temperature</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"onClick={(e)=>{setColor("0, 123, 255")}}>Power</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"onClick={(e)=>{setColor("13,147,255")}}>Humidty</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-btn tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(6, 1, "Temperature")}}> 1 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(24, 1, "Temperature")}}> 24 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(7, 1, "Temperature")}}> 7 Days
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(30, 1, "Temperature")}}> 30 Days
                                </button>
                            </div>
                            <div className="tab-btn tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(6, 3, "Power")}}> 1 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(24, 3, "Power")}}> 24 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(7, 3, "Power")}}> 7 Days
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(30, 3, "Power")}}> 30 Days
                                </button>
                            </div>
                            <div className="tab-btn tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(6, 2, "Humidity")}}> 1 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(24, 2, "Humidity")}}> 24 Hour
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(7, 2, "Humidity")}}> 7 Days
                                </button>
                                <button type="button" className= "button-list" data-toggle="button" aria-pressed="false"  onClick={(e)=>{getGrapData(30, 2, "Humidity")}}> 30 Days
                                </button>
                            </div>
                        </div>
                    </Col>

                    <Col sm={8} className="p-4">
                        <LineGrap data={domY} label={domX} update={false} name="Humidity" color={color}/>
                    </Col>

                </Row>
                </Accordion.Collapse>
            </Fragment>
            </div>
            </Accordion>

        </Container>
        </Fragment>
        
    )
}
