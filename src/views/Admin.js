import React, {useEffect, useState} from 'react';
import List from '../components/List';
import { dataService } from '../services/monitorServices';
import {Modal} from 'react-bootstrap';


export default function Admin(){
    
    const user = JSON.parse(sessionStorage.getItem('user'))

    const [inputForm, setInputForm] = useState({
        newUsername: "",
        newPassword: "",
        newEmail: "",
        newRole: ""
      })

    const [users, setUsers] = useState([]);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [message, setMessage] = useState();

    function handleChange(evt) {
        const value = evt.target.value;
        setInputForm({
            ...inputForm,
            [evt.target.name]: value
        });
    }

    const singUp = async (e) => {
        setMessage("Account created")
        let res = await dataService.SingUp(inputForm.newUsername, inputForm.newPassword, inputForm.newEmail, inputForm.newRole, user.client_id)
        if (res.error){
            setMessage(res.messageError)
        }
    }

    const editSelectedUser = function (val){
        setInputForm({
            ...inputForm,
            newUsername: val.username,
            newPassword: val.password,
            newEmail: val.email,
            newRole: val.web_role
        });
        setShow2(true)
    }

    const removeSelectedUser = function (val){

        setInputForm({
            ...inputForm,
            newUsername: val.username,
        });
        setShow3(true)
    }

    const editUser = async (e) => {
        setMessage("User edited")
        let res = await dataService.editUser(inputForm.newUsername, inputForm.newPassword, inputForm.newEmail, inputForm.newRole, user.client_id)
            if (res.error){
                setMessage(res.messageError)
            }
    }

    const removeUser = async (e) => {
        setMessage("Removed")
            let res = await dataService.removeUser(inputForm.newUsername, user.client_id)
                if (res.error){
                    setMessage(res.messageError)
                }
    }

    const doNot = function (){
        //do nothing
   }

    const getUsers = async() => {
        let res = await dataService.getUsers(user.client_id)
        setUsers(res.data)
    }
    
    useEffect( () => {
        getUsers();
    }, [])

    return(
        <>
        <div className="card-sm-bg mt-4">
            <div className="title-wrp c-ec-title">
                <h5 className="center">Users List</h5>
                <button className="button-add" title="Add New User" onClick={(e) => setShow1(true)}><i className="fas fa-2x fa-plus-square"></i></button>
            </div>
            <div className="p-1">
                <List data={users} columns={['Username','Email','Web Role']} sendData={doNot} remove={removeSelectedUser} edit={editSelectedUser}/>
            </div>
        </div>
            
            <Modal show={show1} onHide={(e) => setShow1(false)}>
            <Modal.Header  className="modal-d">
                <Modal.Title  className="modal-d">Add new User</Modal.Title>
            </Modal.Header >
            <Modal.Body  className="modal-d"> 
                <div className="accform">
                    <form onSubmit={singUp}>
                        <div>
                            <label>Username</label>
                            <input type="text" placeholder="New Username..." minLength="4" required value={inputForm.newUsername} onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="New Password..." minLength="8"  required value={inputForm.newPassword} onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" placeholder="Email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={inputForm.newEmail} onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Web Role</label>
                            <input type="number" placeholder="Role..." minLength="1" required value={inputForm.newRole} onChange={handleChange}/>
                        </div>
                        <input type="submit" value="Add" />
                        <p>{message}</p>
                    </form>
                </div>
            </Modal.Body>
            </Modal>

            <Modal show={show2} onHide={(e) => setShow2(false)}>
            <Modal.Header  className="modal-d">
                <Modal.Title  className="modal-d">Edit User</Modal.Title>
            </Modal.Header >
            <Modal.Body  className="modal-d"> 
                <div className="accform">
                    <form onSubmit={editUser}>
                        <div>
                            <label>Password</label>
                            <input type="password" minLength="8" required value={inputForm.newPassword} onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={inputForm.newEmail} onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Web Role</label>
                            <input type="number" minLength="1" required value={inputForm.newRole} onChange={handleChange}/>
                        </div>
                        <input type="submit" value="Save Changes" />
                        <p>{message}</p>
                    </form>
                </div>
            </Modal.Body>
            </Modal>

            <Modal show={show3} onHide={(e) => setShow3(false)}>
                <Modal.Header  className="modal-d" closeButton>
                    <Modal.Title  className="modal-d">Remove Selected User</Modal.Title>
                </Modal.Header >
                <Modal.Body  className="modal-d"> 
                    <form onSubmit={removeUser}>
                        <p>{inputForm.newUsername} will be removed.</p>
                        <input type="submit" value="Remove" />
                    </form>
                </Modal.Body>
                <Modal.Footer className="modal-d">
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>
            </>
    )
}