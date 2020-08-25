import { CONNECT, SUBSCRIBE, MESSAGE, HUMIDITY, POWER, TEMPERATURE, CO2, MESSAGECO2, MESSAGEHUM, MESSAGEPOW, MESSAGETEMP, BROKERUPTIME, BROKERCONN} from '../actions/mqtt';

const defaultState = {
  message: {},
  humidity: {},
  temperature: {},
  power: {},
  co2: {},
  brokerUptime: {},
  brokerConn: {},
  messageTemp: false,
  messageHum: false,
  messagePow: false,
  messageCo2: false
}

function mqttReducer(state = defaultState, action){
  switch(action.type){
    case CONNECT:
      return {
        ...state,
        client: action.payload
      }

    case SUBSCRIBE:
      return {
        ...state,
        client: action.payload
      }

    case MESSAGE:
      return {
        ...state,
        message: action.payload
      }

    case HUMIDITY:
      return {
        ...state,
        humidity: action.payload,
        messageHum: action.payload.status
      }

    case TEMPERATURE:
      return {
        ...state,
        temperature: action.payload,
        messageTemp: action.payload.status
      }     
    
    case CO2:
      return {
        ...state,
        co2: action.payload,
        messageCo2: action.payload.status
      }

    case POWER:
      return {
        ...state,
        power: action.payload,
        messagePow: action.payload.status
      }

    
    case MESSAGEHUM:
      return {
        ...state,
        messageHum: action.payload
      }
    
    case MESSAGETEMP:
      return {
        ...state,
        messageTemp: action.payload
      }

      case MESSAGEPOW:
    return {
      ...state,
      messagePow: action.payload
    }
    
    case MESSAGECO2:
      return {
        ...state,
        messageCo2: action.payload
      }
    
    case BROKERUPTIME:
      return {
        ...state,
        brokerUptime: action.payload
      }
    case BROKERCONN:
      return {
        ...state,
        brokerConn: action.payload
      }
    default: return state
  }
}

export default mqttReducer;