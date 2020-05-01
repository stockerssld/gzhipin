/* 
    Action Creator 
    Action
    Action
*/
import io from "socket.io-client";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
} from "./../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
} from "./Action-types";


const authSucces = (user) => ({
  type: AUTH_SUCCESS,
  data: user,
});
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  data: user,
});

export const resetUser = (msg) => ({
  type: RESET_USER,
  data: msg,
});

export const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});

function initIO() {
    if (!io.socket) {
      io.socket= io("ws://localhost:3001");
  
      io.socket.on("receiveMsg", function (chatMasg) {
        console.log("El cliente recive el mensaje enviado por el servidor", chatMasg);
      });
    }
}

export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    console.log("El cliente envía mensajes al servidor =>", { from, to, content });
    initIO();
    io.socket.emit('sendMsg', { from, to, content });
  };
};

// Action
export const register = (user) => {
  const { username, password, password2, type } = user;
  if (!username && !password && !password2 && !type) {
    return errorMsg("No se han llenado todo los campos");
  } else if (!username) {
    return errorMsg("Ya existe este usuario");
  } else if (password !== password2) {
    return errorMsg("La contraseñas no coinciden");
  }

  return async (dispatch) => {
    // const response = areqRegister(user)
    // promise.then(response=>{
    //     const result = response.data // {code 0/1, data: user, msg:'}
    // })
    const response = await reqRegister({ username, password, type });
    const result = response.data; // {code 0/1, data: user, msg:'}
    if (result.code === 0) {
      dispatch(authSucces(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const login = (user) => {
  const { username, password } = user;

  if (!username && !password) {
    return errorMsg("No existe este usuario");
  } else if (!username || !password) {
    return errorMsg("Credenciales invalidades");
  }

  return async (dispatch) => {
    // const response = reqLogin(user)
    // promise.then(response=>{
    //     const result = response.data // {code 0/1, data: user, msg:'}
    // })
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(authSucces(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    console.log(user);
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;

    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};
