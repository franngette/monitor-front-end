import React, {useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {dataService} from '../services/monitorServices';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
    
    const [message, setMessage] = useState(false); 
    const [loading, setLoading] = useState();
    const history = useHistory();


    const [inputForm, setInputForm] = useState({
        username: "",
        password: "",
      })
    
    function handleChange(evt) {
        const value = evt.target.value;
        setInputForm({
            ...inputForm,
            [evt.target.name]: value
        });
    }

    const SignIn = async function(e){
        e.preventDefault()
        const res = await dataService.SignIn(inputForm.username, inputForm.password)
        if (res.error) {
            setMessage(true)            
            history.push("/login")
        }
        else {
            sessionStorage.setItem('token', res.token)
            sessionStorage.setItem('user', JSON.stringify(res.user))
            setLoading(true)
            setMessage(false)
            setTimeout(() => {
                history.push("/");
            }, 1000)
        } 
    }

    return(
        <div className="centeredForm">
            <div className="card-cont">
                <form className="form-singin" onSubmit={SignIn}>
                    <div className="item-singin">
                        <input type="text" placeholder="Username" required value={inputForm.username} name="username" onChange={handleChange}></input>
                    </div>
                    <div className="item-singin">
                        <input type="password" placeholder="Password" required value={inputForm.password} name="password" onChange={handleChange}></input>
                    </div>
                    <p className="text-danger">{message ? "You have entered an invalid username or password" : ""}</p>

                    <button type="submit" className="btn-singin">{loading ? <Spinner animation="border" variant="light" size="sm"/> : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}