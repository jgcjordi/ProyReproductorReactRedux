import { combineReducers } from 'redux'

//Dependencias de Reducers
import mediaPlayer from './mediaPlayer';
//import song from './song';

// Exportamos CombineReducers donde alojaremos todos los reducers
export default combineReducers({
    mediaPlayer,
    //song,
});