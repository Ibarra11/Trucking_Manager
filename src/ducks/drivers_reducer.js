let initalState = {
    drivers: []
}

const ADD_DRIVER = 'ADD_DRIVER';

export default function(state=initalState, action){
    switch(action.type){
        case ADD_DRIVER:
            console.log(state.drivers.concat(action.payload))
            return state.drivers.concat(action.payload)
        default:{
            return state
        }
    }
}

export function addDriver({name, contactNumber, address, dateHired, unitNumber}){
    return{
        type: ADD_DRIVER,
        payload:{
            name, contactNumber, address, dateHired, unitNumber
        }
    }
}
