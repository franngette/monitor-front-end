import React, { useState, useEffect} from 'react';
import {Spinner, Modal} from 'react-bootstrap';
import Container from '../components/Container.js';
import {useDispatch, useSelector} from 'react-redux';
import {messageHandler, subscribe} from '../redux/actions/mqtt';
import { dataService } from '../services/monitorServices';
import Widgets from '../components/Widgets';
import LineGraph from '../components/RealTimeGraph';
import { config } from '../config/config';

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
    const [dataSensor, setDataSensor] = useState([]);
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
            <div className="widget-row">

                <div className="widget-dash">
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

                <div className="widget-dash">
                    <h5 className="c-ec-title">Total data registered</h5>
                    <div className="widget-body">
                        <i className="fas fa-3x fa-database text-light"></i>
                        <div>Total data stored: {maxData}</div>
                    </div>
                </div>
                
                <div className="widget-dash">
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

            <div className="card-bg">
                <h5 className="c-ec-title">Realtime Data</h5 >

                <h3 className="p-2 tgt-title" >{objectData ? objectData.object_name : "Waiting for data"}</h3>
                {dataSensor &&
                    <Widgets data={dataSensor}/>}

                        <div className="dash-btn-grap p-4">
                            <button className="button-hide" onClick={handleShow}>Graph</button>
                        </div>
            </div>

            <div className="container-s-2col dahsboard-grap">
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

            <Modal show={show} onHide={handleClose} dialogClassName="modal-d">
                <Modal.Header closeButton>
                <Modal.Title>Realtime Graph</Modal.Title>
                </Modal.Header >
                <Modal.Body> 
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