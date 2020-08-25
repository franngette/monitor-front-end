import React, { useState, useEffect} from 'react';
import {Spinner, Modal} from 'react-bootstrap';
import Container from '../components/Container.js';
import {useDispatch, useSelector} from 'react-redux';
import {messageHandler, subscribe} from '../redux/actions/mqtt';
import { dataService } from '../services/monitorServices';
import { CircularProgressbarWithChildren, buildStyles  } from 'react-circular-progressbar';
import LineGraph from '../components/RealTimeGraph';
import { config } from '../config/config';
import 'react-circular-progressbar/dist/styles.css';

const  Dashboard = () => {

    const systopic = ["$SYS/brokers/" + config.broker.url + "uptime", "$SYS/brokers/" + config.broker.url + "stats/connections.count"];

    const dispatch = useDispatch()
    const client = useSelector( state => state.client)
    const brokerUptime = useSelector( state => state.brokerUptime.message)
    const brokerConn = useSelector( state => state.brokerConn.message)
    const humidity = useSelector( state => state.humidity.message)
    const temperature = useSelector( state => state.temperature.message)
    const messageTemp = useSelector( state => state.messageTemp)
    const messageHum = useSelector( state => state.messageHum)
    const co2 = useSelector( state => state.co2.message)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [dataSensor, setDataSensor] = useState();
    const [objectData, setObjectData] = useState();

    const [maxData, setMaxData] = useState();
    const [ grapTemp, setGrapTemp] = useState();
    const [ grapHum, setGrapHum] = useState();

    const getMaxData = async() => {
        let res = await dataService.maxData();
        setMaxData(res.data[0].id)
    }
   
    const getTarget = async () => {
        let res =  await dataService.getTarget(user.client_id);
            if(res.data){

                let temp = await dataService.grapData(res.data.object_id, 1);
                setGrapTemp(temp.data);
                let hum = await dataService.grapData(res.data.object_id, 2);
                setGrapHum(hum.data)

                setObjectData(res.data)
                let sensor_value = [];
                sensor_value =  await dataService.getSensorValue(res.data.object_id);
                setDataSensor(sensor_value.data);
                let topic = user.client_id + "/" + res.data.site_id + "/" + res.data.object_id + "/" + "+";
                dispatch(subscribe(topic,client));
                dispatch(subscribe(systopic,client));
                dispatch(messageHandler(client));
            }
        }   

        
        useEffect(() => {
            getMaxData();
            getTarget();
        },[])

        return (     
            <Container title='Dashboard'>
            <div className="widget-row mb-4">
                <div className="widget-dash m-2">
                    <h5 className="c-ec-title">Current Connections</h5 >
                    <div className="widget-cont">
                        {brokerConn ? 
                            <div className="widget-body">
                                <i className="fab fa-4x fa-connectdevelop text-success"></i>
                                <div>Active Connections: {brokerConn}</div>
                            </div>
                        : 
                        <div className="widget-body">
                            <Spinner animation="border" variant="light"/>
                        </div>}
                    </div>
                </div>

                <div className="widget-dash m-2">
                    <h5 className="c-ec-title">Total data registered</h5>
                    <div className="widget-body">
                        <i className="fas fa-3x fa-database text-light"></i>
                        <div>Total data stored: {maxData}</div>
                    </div>
                </div>

                
                <div className="widget-dash m-2">
                    <div><h5 className="c-ec-title">MQTT Broker Uptime</h5 ></div>
                    <div className="widget-cont">
                        {brokerUptime ? 
                            <div className="widget-body">
                                <i className="far fa-3x fa-clock text-info"></i>
                                <div>{brokerUptime}</div>
                            </div>
                        : 
                        <div className="widget-body">
                            <Spinner animation="border" variant="light"/>
                        </div>}
                    </div>
                </div>

            </div>
            <div className="card-bg mb-4">
                <h5 className="c-ec-title">Realtime Data</h5 >

                <h3 className="p-2 tgt-title" >{objectData ? objectData.object_name : "Waiting for data"}</h3>
                        <div className="widget-row-progresscircular">

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
                                styles={buildStyles({strokeLinecap: 'butt',pathColor:`rgb(191,0,10)`,trailColor: '#d6d6d6'})}>
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
                                <CircularProgressbarWithChildren value={dataSensor ? co2 ? co2 : dataSensor[3].value : <Spinner animation="border" variant="primary" />} maxValue="1000" strokeWidth="4"
                                styles={buildStyles({strokeLinecap: 'butt',pathColor:`#6c757d`,trailColor: '#d6d6d6'})}>
                                <i className="fas fa-cloud fa-2x"></i>
                                <div>
                                    <strong>CO2</strong>
                                </div>
                                <div style={{ fontSize: 12, marginBottom: 10, paddingTop: 10}}>
                                    <strong>{dataSensor ? co2 ? co2 : dataSensor[3].value : <Spinner animation="border" variant="primary" />}{dataSensor ? dataSensor[3].unit_measured: ""}</strong>
                                </div>
                                </CircularProgressbarWithChildren>
                            </div>
                            
                        </div>

                        <div className="dash-btn-grap p-4">
                            <button className="button" onClick={handleShow}>Graph</button>
                        </div>
                    </div>

                    <div className="container-s-2col dahsboard-grap mb-2">
                        <div className="card-bg card-g">
                            <h5 className="c-ec-title">Realtime Temperature</h5 >
                            <div className="grap">    
                                {grapTemp && <LineGraph newData={temperature} data={grapTemp} update={messageTemp} name="Temperature" color="191,0,10"/>}
                            </div>
                        </div>
                        <div className="card-bg card-g">
                            <h5 className="c-ec-title">Realtime Humidity</h5 >
                            <div className="grap">
                                {grapHum && <LineGraph newData={humidity} data={grapHum} update={messageHum} name="Humidity" color="13,147,255"/>}
                            </div>
                        </div>
                    </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modal-d" closeButton>
                <Modal.Title className="modal-d">Realtime Graph</Modal.Title>
                </Modal.Header >
                <Modal.Body  className="modal-d"> 
                    <div className="chart-container">
                        <div className="chart-item">
                            <h5>Temperature</h5>
                            <LineGraph newData={temperature} data={grapTemp} update={messageTemp} name="Temperature" color="191,0,10"/>
                        </div>
                        <div className="chart-item">
                            <h5>Humidity</h5>
                            <LineGraph newData={humidity} data={grapHum}  update={messageHum} name="Humidity" color="13,147,255"/>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
    </Container>
        ) 
}

export default Dashboard;