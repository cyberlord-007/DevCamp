import {FETCH_PROFILE,PROFILE_ERROR} from '../actions/actionTypes'

const initState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initState,action) {
    const {type,payload} = action;
   switch(type){
       case FETCH_PROFILE:
           
   }
}