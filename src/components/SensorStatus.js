import React  from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function SensorStatus(props) {

  return (

    <div className="col mb-2">
        <div className="card-sm-bg shadow">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col-8 mr-1">
                      <div className={"text-xm" + props.titleClass}>{props.title}</div>
                      <div className="h5 text-center">{props.value}{props.typeValue}</div>
                      {props.value > 0 &&<ProgressBar variant={props.variant} now={props.bar} label={props.label}></ProgressBar>}
                    </div>
                    <div className="col-2">
                        <i className={props.icon}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}