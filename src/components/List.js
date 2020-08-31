import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

export default function List(props){

  const [selectedRow, setSelectedRow] = useState();

  function onSelectedRow(data, i){ 
    setSelectedRow(i)
    props.sendData(data);
  }

  function onSelectedRowEdit(data){ 
    props.edit(data);
  }

  function onSelectedRowRemove(data){ 
    props.remove(data);
  }

    function renderRows() {
        return props.data.map((data, i) => {
            for (let index = 0; index < props.data.length; index++) {
              return (
                  <tr key={i} >
                        <td onClick={(e) => onSelectedRow(data,i)} className={selectedRow === i ? "toolbar text-white" : "" }>{Object.values(data)[index]}</td>
                        <td onClick={(e) => onSelectedRow(data,i)} className={selectedRow === i ? "toolbar text-white" : "" }>{Object.values(data)[index+1]}</td>
                        <td onClick={(e) => onSelectedRow(data,i)} className={selectedRow === i ? "toolbar text-white" : "" }>{Object.values(data)[index+2]}</td>
                        <td className="td-icon">
                          <div className="list-icon">
                            <button className="list-icon-rem" title="Remove" onClick={(e) => onSelectedRowRemove(data)}><i className="far fa-trash-alt"></i></button>
                            <button className="list-icon-edit" title="Edit" onClick={(e) => onSelectedRowEdit(data)}><i className="fas fa-pencil-alt"></i></button>
                          </div>
                        </td>
                  </tr>
                  
              )
            }
        })
    }

    return(
          <div className='mb-4 li-bg m-2'>
          <Card.Body>
            <Table hover responsive="md">
                <thead>
                    <tr>
                      {
                        props.columns.map((column) => {
                          return (
                            <th key={column}>{column}</th>
                          )
                        })
                      }
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </Table>
          </Card.Body>
      </div>
    );
};