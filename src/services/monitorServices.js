import { config } from '../config/config';
import axios from 'axios';

const apiURL = config.api.baseURL;
const token = sessionStorage.getItem('token')

export const dataService = {
    grapData,
    editUser,
    removeUser,
    removeObject,
    removeSite,
    maxData,
    editObj,
    editSite,
    getSensors,
    getLogs,
    getUsers,
    addNewObj,
    addNewSite,
    getTarget,
    getSite,
    ReadObject,
    getData,
    getDataLimit,
    setRelayState,
    getSensorValue,
    SignIn,
    SingUp,
    UpdateAcc
};

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

async function grapData(object_id, sensor_id){
  const token = sessionStorage.getItem('token')
  let data={
    'object_id': object_id,
    'sensor_id': sensor_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/get_grap_data`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function editUser(username, password, email, role, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'username': username,
    'password': password,
    'email': email,
    'role': role,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/edit_user`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function removeUser(username, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'username': username,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/delete_user`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function removeObject(object_name, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'object_name': object_name,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/delete_obj`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function removeSite(name, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'name': name,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/delete_site`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function maxData(){
  const token = sessionStorage.getItem('token')
  let data;
  const options = {
    method: 'post',
    url: `${apiURL}/get_max_data`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}


async function editObj(obj_id, object_name, object_adress, object_lattitude, object_longitude, object_contact, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'obj_id': obj_id,
    'object_name': object_name,
    'object_adress': object_adress,
    'object_lattitude': object_lattitude,
    'object_longitude': object_longitude,
    'object_contact': object_contact,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/edit_obj`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function editSite(id, site_name, site_adress, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'id': id,
    'site_name': site_name,
    'site_adress': site_adress,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/edit_site`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function getSensors(){
  const token = sessionStorage.getItem('token')
  let data = {}
  const options = {
    method: 'post',
    url: `${apiURL}/get_sensors`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function getLogs(client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/get_logs`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function getUsers(client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/get_users`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function addNewObj(site_id, object_name, object_adress, object_lattitude, object_longitude, object_contact, client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'site_id': site_id,
    'object_name': object_name,
    'object_adress': object_adress,
    'object_lattitude': object_lattitude,
    'object_longitude': object_longitude,
    'object_contact': object_contact,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/add_new_obj`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function addNewSite(client_id, site_name, site_adress){
  const token = sessionStorage.getItem('token')
  let data={
    'client_id': client_id,
    'site_name': site_name,
    'site_adress': site_adress
  }

  const options = {
    method: 'post',
    url: `${apiURL}/add_new_site`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function getSite(client_id){
  const token = sessionStorage.getItem('token')
  let data={
    'client_id': client_id
  }

  const options = {
    method: 'post',
    url: `${apiURL}/get_sites`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);

  return data;
}

async function getTarget(client_id){
  const token = sessionStorage.getItem('token')
  let data = {
    'client_id': client_id
  }

  const options = {
    method: 'post',
    url: `${apiURL}/get_target`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);

  return data;
}

async function UpdateAcc(usernameSession, password, email, client_id){
  const token = sessionStorage.getItem('token')
  let data = {
    'client_id': client_id,
    'usernameSession': usernameSession,
    'password': password,
    'email': email
  }

  const options = {
    method: 'post',
    url: `${apiURL}/user_update_acc`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function SingUp(username, password, email, web_role, client_id){
  const token = sessionStorage.getItem('token')
  let data = {
    'username': username,
    'password': password,
    'email': email,
    'web_role': web_role,
    'client_id': client_id
  }
  const options = {
    method: 'post',
    url: `${apiURL}/user_sing_up`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function SignIn(username, password){
  let data = {
      'username': username,
      'password': password
  }
  const options = {
    method: 'post',
    url: `${apiURL}/user_sing_in`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function setRelayState(node, relay_state) {
  const token = sessionStorage.getItem('token')
  let data = {
      node_id : node.id,
      relay_state : !relay_state
  };

  const options = {
    method: 'post',
    url: `${apiURL}/update_relay_state`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}

async function getSensorValue(object) {
  const token = sessionStorage.getItem('token')
  let data = {
    object_id : object
  };
  const options = {
    method: 'post',
    url: `${apiURL}/get_last_value_sensors_by_object`,
    headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`},
    data: data,
  };

  await axios(options)
  .then(res => {
    data = res.data;
  })
  .catch(error => data = error);
  return data;
}


async function ReadObject(client_id) {
  const token = sessionStorage.getItem('token')
    let data ={
      client_id : client_id
    };
    const options = {
      method: 'post',
      url: `${apiURL}/read_object`,
      headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`},
      data: data,
    };
  
    await axios(options)
    .then(res => {
      data = res.data;
    })
    .catch(error => data = error);
    return data;
}

async function getData(client_id, site_id, object_id, sensor_id, fdesde, fhasta) {
  const token = sessionStorage.getItem('token')
    let data = {
        client_id : client_id,
        site_id : site_id,
        object_id : object_id,
        sensor_id : sensor_id,
        fecha_desde : fdesde,
        fecha_hasta : fhasta
    };

    const options = {
      method: 'post',
      url: `${apiURL}/read_data`,
      headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`},
      data: data,
    };
  
    await axios(options)
    .then(res => {
      data = res.data;
    })
    .catch(error => data = error);
    return data;
}

async function getDataLimit(object_id, sensor_id, hours) {
  const token = sessionStorage.getItem('token')
    let data = {
        object_id : object_id,
        sensor_id : sensor_id,
        hours : hours
    };

    const options = {
      method: 'post',
      url: `${apiURL}/read_data_limit`,
      headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`},
      data: data,
    };
  
    await axios(options)
    .then(res => {
      data = res.data;
    })
    .catch(error => data = error);
    return data;
}

