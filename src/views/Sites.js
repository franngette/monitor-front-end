import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import List from '../components/List';
import { dataService } from '../services/monitorServices';
import {Modal} from 'react-bootstrap';

export default function Site(){

    const [inputForm, setInputForm] = useState({
        newSiteID: "",
        newSiteName: "",
        newSiteAdress: "",
        newObjAdress: "",
        newObjName: "",
        newObjLattitude: "",
        newObjLongitude: "",
        newObjContact: ""
      })

    const [ message, setMessage] = useState();
    const [ objectsData, setObjectsData ] = useState(); 
    const [ sitesData, setSitesData ] = useState([]); 
    const [ node, setNode ] = useState([]);
    
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);


    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem('user'))

    function handleChange(evt) {
        const value = evt.target.value;
        setInputForm({
            ...inputForm,
            [evt.target.name]: value
        });
    }

    const getSites = async () => {
        let res = await dataService.getSite(user.client_id);
        setSitesData(res.data);
    }

    const setObject = async (site) => {
        let res = await dataService.ReadObject(site.id);
        setObjectsData(res.data)
    }

    const setSite = function (site){
        setInputForm({
            ...inputForm,
            newSiteID: site.id,  });
        setObject(site)
   }

    const getSelect = function (val){
        setNode(val);
        history.push({
            pathname: '/objdetail',
            state: { 
                node: val,
                site_id: inputForm.newSiteID
            }
        })   
    }

     const editSelectedSite = function (val){
        setInputForm({
            ...inputForm,
            newSiteID: val.id,
            newSiteName: val.name,
            newSiteAdress: val.adress
        });
        setShow5(true)
    }

    const removeSelectedSite = function (val){
        setObject(val)
        setInputForm({
            ...inputForm,
            newSiteName: val.name,
        });
        setShow4(true)
    }

    const removeSelectedObj = function (val){
        setInputForm({
            ...inputForm,
            newObjName: val.object_name,
        });
        setShow6(true)
    }

    const editSelected = function (val){
        setInputForm({
            ...inputForm,
            newObjID: val.id,
            newObjName: val.object_name,
            newObjAdress: val.adress,
            newObjLattitude: val.lattitude,
            newObjLongitude: val.longitude,
            newObjContact: val.contact,
        });
        setShow3(true)
    }

    const addNewSite = async (e) => {
        e.preventDefault()
        setMessage("Site added")
        let res = await dataService.addNewSite(user.client_id, inputForm.newSiteName, inputForm.newSiteAdress)
            if (res.error){
                setMessage(res.messageError)
            }
    }

    const addNewObj = async (e) => {
        e.preventDefault()
        setMessage("Object added")
        let res = await dataService.addNewObj(inputForm.newSiteID, inputForm.newObjName, inputForm.newObjAdress, inputForm.newObjLattitude, inputForm.newObjLongitude, inputForm.newObjContact, user.client_id)
            if (res.error){
                setMessage(res.messageError)
            }
    }

    const editObj = async (e) => {
        setMessage("Object edited")
        let res = await dataService.editObj(inputForm.newObjID, inputForm.newObjName, inputForm.newObjAdress, inputForm.newObjLattitude, inputForm.newObjLongitude, inputForm.newObjContact, user.client_id)
            if (res.error){
                setMessage(res.messageError)
            }
    }
    
    const editSite = async (e) => {
        setMessage("Site edited")
        let res = await dataService.editSite(inputForm.newSiteID, inputForm.newSiteName, inputForm.newSiteAdress, user.client_id)
            if (res.error){
                setMessage(res.messageError)
            }
    }

    const removeSite = async (e) => {
        setMessage("Removed")
            let res = await dataService.removeSite(inputForm.newSiteName, user.client_id)
                if (res.error){
                    setMessage(res.messageError)
                }
    }

    const removeObject = async (e) => {
        setMessage("Removed")
            let res = await dataService.removeObject(inputForm.newObjName, user.client_id)
                if (res.error){
                    setMessage(res.messageError)
                }
    }
        
    useEffect( () => {
        getSites();
    }, [])
    
    return (
        <div className="container-2col">
            <div className="card-sm-bg col-g-2">
                <h5 className="c-ec-title">Site List</h5>
                <div className="p-1">
                    <List data={sitesData} columns={['ID','Name','Location']} sendData={setSite} remove={removeSelectedSite} edit={editSelectedSite}/>
                </div>
                <div className="button-content">
                    <button className="button-add" onClick={(e) => setShow1(true)} title="Add New Site"><i className="fas fa-2x fa-plus"></i></button>
                </div>
            </div>
            
            <div className="card-sm-bg col-g-2">
                <div className="c-ec-title">
                    <h5>Object List</h5>
                </div>
                    {objectsData ? (
                        <div className="p-1">
                            <List data={objectsData} columns={['ID','Name','Location']}sendData={getSelect} remove={removeSelectedObj} edit={editSelected}/>
                        </div>
                    ):(
                        <div className="p-1">
                            <p>Select Site to show Objects</p>
                            <List data={[]} columns={['ID','Name','Location']}/>
                        </div>
                    )}
                    <div className="button-content">
                        {objectsData ? (<button className="button-add" onClick={(e) => setShow2(true)} title="Add New Object"><i className="fas fa-2x fa-plus"></i></button>) : ( <div></div>)}
                    </div>

            </div>

            <Modal show={show1} onHide={(e) => setShow1(false)}  dialogClassName="modal-d">
                <Modal.Header   closeButton>
                    <Modal.Title >Add new Site </Modal.Title>
                </Modal.Header >
                <Modal.Body> 
                <div>
                    <form onSubmit={addNewSite}>
                    <div>
                            <label>Site Name</label>
                            <input type="text" required value={inputForm.newSiteName} name="newSiteName" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Site Adress</label>
                            <input type="text" required value={inputForm.newSiteAdress} name="newSiteAdress" onChange={handleChange}></input>
                        </div>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={(e) => setShow2(false)} dialogClassName="modal-d">
                <Modal.Header  closeButton>
                    <Modal.Title >Add new Object</Modal.Title>
                </Modal.Header >
                <Modal.Body > 
                <div>
                    <form onSubmit={addNewObj}>
                        <div>
                            <label>Object Name</label>
                            <input type="text" required value={inputForm.newObjName} name="newObjName" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Site Adress</label>
                            <input type="text" required value={inputForm.newObjAdress} name="newObjAdress" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Latitude</label>
                            <input type="text" step="any" required value={inputForm.newObjLattitude} name="newObjLattitude" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input type="text" step="any" required value={inputForm.newObjLongitude} name="newObjLongitude" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Contact</label>
                            <input type="number" required value={inputForm.newObjContact} name="newObjContact" onChange={handleChange}></input>
                        </div>
                        <input type="submit" value="Add" />
                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>

            <Modal show={show3} onHide={(e) => setShow3(false)} dialogClassName="modal-d">
                <Modal.Header  closeButton>
                    <Modal.Title >Edit Object </Modal.Title>
                </Modal.Header >
                <Modal.Body > 
                <div>
                    <form onSubmit={editObj}>
                        <div>
                            <label>Object Name</label>
                            <input type="text" required value={inputForm.newObjName} name="newObjName" onChange={handleChange} ></input>
                        </div>
                        <div>
                            <label>Object Adress</label>
                            <input type="text" required value={inputForm.newObjAdress} name="newObjAdress" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Latitude</label>
                            <input type="text" required step="any" value={inputForm.newObjLattitude} name="newObjLattitude" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input type="text" required step="any" value={inputForm.newObjLongitude} name="newObjLongitude" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Contact</label>
                            <input type="number" required value={inputForm.newObjContact} name="newObjContact" onChange={handleChange}></input>
                        </div>
                        <input type="submit" value="Save Changes" />

                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>

            
            <Modal show={show4} onHide={(e) => setShow4(false)} dialogClassName="modal-d">
                <Modal.Header  closeButton>
                    <Modal.Title >Remove Selected Site</Modal.Title>
                </Modal.Header >
                <Modal.Body > 
                    <form onSubmit={removeSite}>
                        <p>{inputForm.newSiteName} will be removed.</p>
                        {objectsData && <p>The Site have {objectsData.length} object.</p>}
                        <input type="submit" value="Remove" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>

            <Modal show={show6} onHide={(e) => setShow6(false)} dialogClassName="modal-d">
                <Modal.Header  closeButton>
                    <Modal.Title >Remove Selected Object</Modal.Title>
                </Modal.Header >
                <Modal.Body > 
                    <form onSubmit={removeObject}>
                        <p>{inputForm.newObjName} will be removed.</p>
                        <input type="submit" value="Remove" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>

            <Modal show={show5} onHide={(e) => setShow5(false)} dialogClassName="modal-d">
                <Modal.Header  closeButton>
                    <Modal.Title >Edit Site </Modal.Title>
                </Modal.Header >
                <Modal.Body > 
                <div>
                    <form onSubmit={editSite}>
                        <div>
                            <label>Site Name</label>
                            <input type="text" required value={inputForm.newSiteName} name="newSiteName" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Site Adress</label>
                            <input type="text" required value={inputForm.newSiteAdress} name="newSiteAdress" onChange={handleChange}></input>
                        </div>
                        <input type="submit" value="Save Changes"/>
                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <p>{message}</p>
                </Modal.Footer>
            </Modal>

        </div>

        


    )
}