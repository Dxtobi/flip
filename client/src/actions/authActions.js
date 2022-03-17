import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_TRANSACTION, GET_USER_DETAILS, CLEAR_STATUS, PROFILE_LOADING_STOP, GET_ERRORS, SET_CURRENT_USER,PROFILE_LOADING, CLEAR_ERRORS, GET_PROFILE, SET_STATUS } from './types';

export const getTransactions =  () => dispatch => {
  //console.log(userData, history)
  dispatch({type:PROFILE_LOADING})
  axios.get('/api/users/get_my_transactions')
   .then(res => {
      dispatch({
        type: GET_TRANSACTION,
        payload: res.data
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
     );
};

export const completeTransOtp =  (data) => dispatch => {
  //console.log(userData, history)
  dispatch({type:PROFILE_LOADING})
  axios.post('/api/users/get_update_transactions', data)
   .then(res => {
      dispatch({
        type: PROFILE_LOADING_STOP,
       
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
     );
};

export const getInvitationCode =  () => dispatch => {
  //console.log(userData, history)
  dispatch({type:PROFILE_LOADING})
  axios.get('/api/users/getInvitationCode')
   .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
   } )
   .catch( err =>
      { dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
     );
};

export const test = () => {
 // console.log('hit')
  axios
    .post( '/', )
    .then( res => console.log('working') )
    .catch( err =>
       {console.log('err')}
      );
};


export const verifyMail = (userData, history) => dispatch => {
    //console.log(userData, history)
    axios.post('/api/users/verify_email', userData)
     .then(res => {
         history.push(`/trans_details/${res.data._id}`)
        // console.log(res.data)
     } )
     .catch( err =>
        { dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
       );
 };

 export const getProfileId = (id) => dispatch => {
  dispatch({type:PROFILE_LOADING})
  axios
    .get( '/api/users/get_profile_id/'+id)
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
        payload: res.data
      })
      dispatch({
        type: SET_STATUS,
        payload: res.status
      })
    })
    .catch(err => {
     // console.log(err.response.data)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};

export const confirmPayment = (pin, data) => dispatch => {
  dispatch({type:PROFILE_LOADING})
  axios
    .post( '/api/users/get_pin_from_profile/'+pin, data)
    .then(res => {
     // console.log('---'+res.data)
      
        dispatch({
          type: GET_USER_DETAILS,
          payload: res.data
        })
      
    })
    .catch(err => {
      console.log('---' + err)
      dispatch({type:PROFILE_LOADING_STOP})
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};
//
export const getProfile = () => dispatch => {
  dispatch({type:PROFILE_LOADING})
  axios
    .get( '/api/users/get_profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
     // console.log(err.response.data)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};
export const registerUser = (userData, history) => dispatch => {
  //console.log(userData, history)
  axios
    .post( '/api/users/register', userData )
    .then(res => { //console.log(res)
      history.push('/login')
    })
    .catch(err => {
      console.log(err.response.data)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
};

export const loginUser = (userData) => dispatch => {
  console.log(userData)
  axios
    .post('/api/users/login', userData)
    .then(res => {
      console.log(res)
      //Save to localStorage
      dispatch(setAuth(res))

    })
    .catch( err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const changeMail = ( userData ) => dispatch => {
  axios
    .post('/api/users/change_email', userData)
    .then(res => {
      console.log(res)
      dispatch(setAuth(res))
      dispatch({
        type: SET_STATUS,
        payload: res.status
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.user
      })

    })
    .catch(err =>{
      console.log(err.response.data)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};
export const changePassword = ( userData ) => dispatch => {
  axios
    .post('/api/users/change_password', userData)
    .then(res => {
      dispatch(setAuth(res))
      dispatch({
        type: SET_STATUS,
        payload: res.status
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.user
      })

    })
    .catch( err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem( 'flipJwtToken' );
  // Remove auth header for future requests
  setAuthToken( false );
  // Set the current user to {} which will set isAuthenticated to false
  dispatch( setCurrentUser( { } ) );
}
export const clearErrors = () => dispatch => {
  //console.log('cleard')
  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const clearStatus = () => dispatch => {
  dispatch({
    type: CLEAR_STATUS,
  })
}

export const setAuth = (res) => dispatch => {
  const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem('flipJwtToken', token );
      //Set token to Auth header
      setAuthToken( token );
      //Decode token to get user data
      const decoded = jwt_decode( token );
      //Set current user
      dispatch( setCurrentUser( decoded ) );
}