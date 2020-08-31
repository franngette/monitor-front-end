import React, { Fragment, useState, useEffect } from 'react';
import Container from '../components/Container';
import Widgets from '../components/Widgets';
import { useLocation } from "react-router-dom";
import { dataService } from '../services/monitorServices';
import { Row, Col, Card, Accordion} from 'react-bootstrap/';
import '../App.css';
import LineGrap from '../components/LineGraph'
import {subscribe} from '../redux/actions/mqtt';
import {useDispatch, useSelector} from 'react-redux';

export default function ObjectDetail(){

    let location = useLocation ();

    const dispatch = useDispatch()
    const client = useSelector( state => state.client)
    
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [object, setObject] = useState(location.state);
    const [dataSensor, setDataSensor] = useState();
    const [domX, setDomX] = useState();
    const [domY, setDomY] = useState();
    const [labelData, setLabelData] = useState();
    const [color, setColor] = useState("191,0,10");

    
    const sensorsValue = async (object) => {
        let res =  await dataService.getSensorValue(object.node.id);
        setDataSensor(res.data)
        console.log(object.node.id)
        let topic = user.client_id + "/" + object.site_id + "/" + object.node.id + "/" + "+";
        dispatch(subscribe(topic,client));
        console.log(topic)
        }

    const getGrapData = async (hours, sensor_id, labelData) => {
        let res = await dataService.getDataLimit(object.node.id, sensor_id, hours);
        setDomX(res.x);
        setDomY(res.y);
        setLabelData(labelData);
    }
    
    useEffect( () => {
        sensorsValue(object)
    } 
    ,[])
 
        return (
        <Fragment>
        <Container>
            <div className="card-bg mb-4 container-2col">
                <div className="card-obj col-g-1 m-4 p-4">
                    <h3 className="p-4"><b>{object.node.object_name + " detail"}</b></h3>
                    <p><b>Address:</b> {object.node.adress}</p>
                    <p><b>Contact: </b>{object.node.contact}</p>                            
                    <p><b>Coordinates: </b>{object.node.lattitude} , {object.node.longitude}</p>
                </div>
            
                <div className="col-g-2">
                    {dataSensor &&
                    <Widgets data={dataSensor}/>}
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
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"onClick={(e)=>{setColor("50, 205, 50")}}>Power</a>
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
