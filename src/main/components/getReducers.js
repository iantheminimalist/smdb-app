
import  * as actiontypes from './ActionTypes';
//initializing actions with default values
export const INITIAL_STATE = {
    loading : false,
    movies : [],
    error : false
}



export const fetchMovies = (state, action) => {
   
    switch (action.type) {
        case actiontypes.MOVIE_FETCH_LOADING: 
        return{
            loading : true,
            movies: [],
            error : false,
        };
        case actiontypes.MOVIE_FETCH_SUCCESS: 
        return{
            ...state,
            loading : false,
            movies: action.payload,
            error : false,
        };
        case actiontypes.MOVIE_FETCH_FAILED: 
        return{
            loading : false,
            movies: [],
            error : true,
        };
        default:
            return state;
    }
}