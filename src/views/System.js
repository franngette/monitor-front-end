import React, {useState, useEffect} from 'react';
import ListLog from '../components/ListLog';
import { dataService } from '../services/monitorServices';



export default function System(){

    const [logs, setLogs] = useState([]);
    const [sensors, setSensors] = useState([]);

    const user = JSON.parse(sessionStorage.getItem('user'))

    const getSensors = async() => {
        let res = await dataService.getSensors();
        setSensors(res.data);
    }

    const getLogs = async() => {
        let res = await dataService.getLogs(user.client_id);
        setLogs(res.data);
    }

    useEffect( () => {
        getLogs();
        getSensors();
    }, [])

    return(
        <>
        <div className="container-2col-center">
            <div className="card-sm-bg col-g-2 ">
                <h5 className="c-ec-title">System Log</h5>
                <div className="p-1">
                    <ListLog data={logs} columns={['ID','Log','Date']}/>
                </div>
            </div>

            <div className="card-sm-bg col-g-1 ml-2">
                <h5 className="c-ec-title">Sensors ID</h5>
                <div className="p-1">

                <ListLog data={sensors} columns={['ID','Type','Unit']}/>
                </div>

            </div>
        </div>
        </>
    )
}