import produce from 'immer';
import createReducer from './ReducerUtil'

const initalState = {
    currentLocation:[],
    currentKey:"",
    currentCity:"",
    listLocations:[],
    listFavorite: [], 
    defaultLocation:[],
    days:[],
}

const dataReducer = {
    setCurrentLocation(state, action) {
        debugger;
        state.currentLocation = action.payload;
    },
    setCurrentKey(state, action) {
        debugger;
        state.currentKey = action.payload;
    },
    setCurrentCity(state, action) {
        debugger;
        state.currentCity = action.payload;
    },
    setListFavorite(state, action) {
        debugger
        state.listFavorite =state.listFavorite.concat(action.payload) ;
    },
    setListLocations(state, action) {
        state.listLocations = action.payload;
    },
    setDefaultLocation(state, action) {
        state.defaultLocation = action.payload;
    },
    setDays(state, action) {
        debugger;
        state.days = action.payload;
    },
}

export default produce((state, action) => createReducer(state, action, dataReducer), initalState);