import {login as _login} from 'api/auth';
 

// export const login = (data) => async (dispatch) => {
//     const responseData = await _login(data);
//     const {
//         authentication: {access_token, refresh_token},
//         user,
//       } = responseData;

//     dispatch(
//         setAuthentication({
//         accessToken: access_token,
//         refreshToken: refresh_token,
//         }),
//     );
// }
