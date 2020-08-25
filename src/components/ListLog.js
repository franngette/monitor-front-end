import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

export default function ListLog(props){

    const [selectedRow] = useState();

    function renderRows() {
        return props.data.map((data, i) => {
            for (let index = 0; index < props.data.length; index++) {
              return (
                  <tr key={i} className={selectedRow === i ? "bg-primary text-white" : "" }>
                        <td>{Object.values(data)[index]}</td>
                        <td>{Object.values(data)[index+1]}</td>
                        <td>{Object.values(data)[index+2]}</td>
                        <td className="text-right">
                      </td> 
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