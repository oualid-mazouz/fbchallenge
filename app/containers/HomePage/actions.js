export const login = (payload)=>{
    console.log(payload);
    return {
        type:'CONNECT_USER',
        payload
    }
};

export const logout = ()=> {
  return {
    type: 'LOGOUT_USER'
  }
};

