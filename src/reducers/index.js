import { CHANGE_MEAT_TYPE, CHANGE_DONENESS } from '../constants/action-types'
import {doneness, redMeatRanges, chickenRanges, pattyRanges} from '../data';

export class DonenessCalculator {
    static filterDonnessesForMeatType(meatType) {
        if (meatType === "chicken" || meatType === "patties") {
          return doneness.filter(d => d.name === "wellDone")
        }
        return doneness;
      }

    static calculateTemperature(doneness, meatType) {
      switch (meatType) {
        case "beef":
        case "lamb":
          return redMeatRanges[doneness];
  
        case "chicken":
          return chickenRanges['wellDone'];
  
        case "patties":
          return pattyRanges['wellDone'];
        default:
          return null;
      }
    }
  }

const initialState = {
    meatType: "beef",
    doneness: "rare", 
    donenesses: doneness,
    targetTemperatureRange: DonenessCalculator.calculateTemperature("rare", "beef") 
}



const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_MEAT_TYPE:
            return { ...state, 
                meatType: action.payload.meatType,  
                targetTemperatureRange: DonenessCalculator.calculateTemperature(state.doneness, action.payload.meatType),
                donenesses: DonenessCalculator.filterDonnessesForMeatType(action.payload.meatType),
                doneness: (action.payload.meatType === "chicken" || action.payload.meatType === "patties") ? "wellDone" : state.doneness
            }           
        case CHANGE_DONENESS:
             return { ...state, 
                doneness: action.payload.doneness,  
                targetTemperatureRange: DonenessCalculator.calculateTemperature(action.payload.doneness, state.meatType) 
            }           
         default:
            return state;
    }
}



export default rootReducer;