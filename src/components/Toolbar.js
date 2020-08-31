import React, { Fragment, useState }  from 'react';
import logo from '../assets/path874.png'
import { useHistory } from 'react-router-dom';
import {Modal} from 'react-bootstrap/';
import {dataService} from '../services/monitorServices'

export default function Toolbar() {

    const user = JSON.parse(sessionStorage.getItem('user'))
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [password, setPassword] = useState();
    const [retryPassword, setRetryPassword] = useState();
    const [email, setEmail] = useState(user.email);
    const [message, setMessage] = useState();

    const updateAcc = async (e) => {
        if(retryPassword === password){
            e.preventDefault()
            setMessage("Account update")
            let res = await dataService.UpdateAcc(user.username, password, email, user.client_id)
            if (res.error){
                setMessage(res.messageError)
            }
        }
        else{
            setMessage("Password dont match")
            e.preventDefault()
        }
    }

    const history = useHistory();
    const logout = () => {
        sessionStorage.removeItem("token");
        history.push("/login");
    }

return (

        <Fragment>
            <div>
                <nav className="navbar navbar-dark toolbar">
                    <div className="logo">
                        <a className="navbar-brand" href="/"><img src={logo} className="logo" /></a>
                    </div>
                    <div className="dropdown dropleft">
                        <button className="user" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="far fa-user fa text-white"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="btn dropdown-item" onClick={logout} >Logout</a>
                            <a className="btn dropdown-item" onClick={handleShow}>Account Management</a>
                        </div>
                    </div>
                </nav>
            </div>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-d">
                <Modal.Header closeButton >
                    <Modal.Title>Account Management</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="m-4">
                        <form onSubmit={updateAcc}>
                        <div>
                            <label>New Password</label>
                            <input
                                type="password" placeholder="New Password..." minlength="8"  required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>
                        <div>
                            <label>Change Password</label>
                            <input
                                type="password" placeholder="Retry Password..." minlength="8"  required
                                value={retryPassword}
                                onChange={e => setRetryPassword(e.target.value)}
                                />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email" required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        <input type="submit" value="Save" />
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <p>{message}</p>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
