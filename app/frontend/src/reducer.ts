import { combineReducers } from 'redux';

import doctor from './view/doctor/reducer';
import patient from './view/patient/reducer';

export default combineReducers({ patient, doctor });
