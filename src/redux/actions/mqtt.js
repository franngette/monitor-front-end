import { config } from '../../config/config';
var mqtt = require('mqtt')

export const CONNECT = 'CONNECT'
export const SUBSCRIBE = 'SUBSCRIBE'
export const MESSAGE = 'MESSAGE'
export const HUMIDITY = 'HUMIDITY'
export const TEMPERATURE = 'TEMPERATURE'
export const POWER = 'POWER'
export const CO2 = 'CO2'
export const UPDATE = 'UPDATE'
export const MESSAGETEMP = 'MESSAGETEMP'
export const MESSAGEHUM = 'MESSAGEHUM'
export const MESSAGEPOW = 'MESSAGEPOW'
export const MESSAGECO2 = 'MESSAGECO2'
export const BROKERUPTIME = 'BROKERUPTIME'
export const BROKERCONN = 'BROKERCONN'

// Action Creators
const brokerURL = config.broker.brokerURL

export const connectMqtt = ( ) => {
  let client = mqtt.connect(`${brokerURL}`, {keepalive:0})
    return {
        type: CONNECT, 
        payload: client
      };
}

export const subscribe = (topic, client) => {
    client.subscribe(topic)
        return {
            type: SUBSCRIBE, 
            payload: client
        };
}

export const update = () => {
        return {
            type: UPDATE, 
            payload: false
        };
}

export function mensaje (message) {
        return {
            type: MESSAGE, 
            payload: message
        };
}

export function messageHandler (client) {
    return function (dispatch) {
      return client.on('message',function(topic, message, packet){
        let result = {
            message: ''+message,
            topic: packet.topic,
            status: true
        }
            if (message.length>0){
                let sensorId = result.topic.substring(result.topic.length - 1)
                let sysTopic = result.topic.substring(28, result.topic.length)
                    switch(sensorId){
                        case "1":
                                dispatch( {type: TEMPERATURE, payload: result})
                                dispatch({type: MESSAGETEMP, payload: false})
                            break
                        case "2":
                                dispatch( {type: HUMIDITY, payload: result})
                                dispatch({type: MESSAGEHUM, payload: false})
                            break
                        case "3":
                                dispatch( {type: POWER, payload: result})
                                dispatch({type: MESSAGEPOW, payload: false})
                            break
                        case "4":
                                dispatch( {type: CO2, payload: result})
                                dispatch({type: MESSAGECO2, payload: false})
                            break
                    }

                    switch(sysTopic){
                        case "uptime":
                                dispatch( {type: BROKERUPTIME, payload: result})
                            break
                        case "stats/connections.count":
                                dispatch( {type: BROKERCONN, payload: result})
                            break
                    }
            }
        })
    }
  }
