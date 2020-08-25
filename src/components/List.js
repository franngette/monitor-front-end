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
                        <td onClick={(e) => onSelectedRowRemove(data)}><button className="button-list-icon" title="Remove" ><i className="far fa-trash-alt"></i></button></td>
                        <td onClick={(e) => onSelectedRowEdit(data)}><button className="button-list-icon" title="Edit"><i className="fas fa-pencil-alt"></i></button></td>
                  </tr>
                  
              )
            }
        })
    }

    return(
          <div className='mb-4 li-bg m-2'>
          <Card.Body>
            <Table hover responsive="md" size="sm" >
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