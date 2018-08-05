import {CHANGE_MEAT_TYPE, CHANGE_DONENESS} from '../constants/action-types';
export const changeMeatType = meatType => ({type: CHANGE_MEAT_TYPE, payload: meatType });
export const changeDoneness = doneness => ({type: CHANGE_DONENESS, payload: doneness });
