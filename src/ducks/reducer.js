let initalState = {
    drivers: [],
    shipper: '',
    pickupAddr: '',
    destAddr: '',
    rate: '',
    date: ''
}

const ADD_DRIVERS = 'ADD_DRIVERS';
const DELETE_DRIVER = 'DELETE_DRIVER';
const ADD_LOAD = 'ADD_LOAD';
const CLEAR_STATE = 'CLEAR_STATE';

export default function (state = initalState, action) {
    switch (action.type) {
        case ADD_DRIVERS:
            let driversList = state.drivers.slice();
            driversList.push(...action.payload)
            return Object.assign({}, state, { drivers: driversList });
        case DELETE_DRIVER:
            let driversList2 = state.drivers.filter(driver => driver.driver != action.payload);
            return Object.assign({}, state, { drivers: driversList2 });
        case ADD_LOAD:
            let { shipper, pickupAddr, destAddr,  rate, date } = action.payload;
            return Object.assign({}, state, {shipper: shipper, pickupAddr: pickupAddr, destAddr: destAddr, rate: rate, date: date})
        case CLEAR_STATE:
            return initalState;
        default:
            return state;
    }
}


export function addDrivers(drivers) {
    return {
        type: ADD_DRIVERS,
        payload: drivers
    }
}

export function deleteDriver(driver) {
    return {
        type: DELETE_DRIVER,
        payload: driver
    }
}

export function addLoad(payload) {
    return {
        type: ADD_LOAD,
        payload
    }
}

export function clearState(){
    return{
        type: CLEAR_STATE
    }
}

