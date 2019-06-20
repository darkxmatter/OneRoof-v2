import React from 'react';
import AptNum from './ApartmentDropDown.jsx'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as userActions from '../Actions/userActions.js';


const mapStateToProps = store => ({
  // add pertinent state here
  username: store.user.username,
  password: store.user.password,
  role: store.user.role,
  login: store.user.login,
  aptId: store.user.apt,
  aptList: store.user.aptList
});


const mapDispatchToProps = dispatch => ({
  updateUsername: (name) => dispatch(userActions.updateUsername(name)),
  updatePassword: (pass) => dispatch(userActions.updatePassword(pass)),
  signup: () => dispatch(userActions.signup()),
  signIn: () => dispatch(userActions.signIn()),
  updateApt: (apt) => dispatch(userActions.updateApt(apt)),
  updateRole: (role) => dispatch(userActions.updateRole(role))
})

const Login = props => {
  const aptDrop = [];
  const aptNumList = props.aptList;
  aptNumList.forEach(num => aptDrop.push(<AptNum aptNum={num} />));
  return(
    <div>
      {props.login === false ? (
 <div key="loginPageMain" className="innerbox" id="loginMain">
   <div key="loginBox" id="loginBox">
     LOG IN:
     <form key="logForm" id="login" onSubmit={e => {
     e.preventDefault();
     props.signIn();
     }}>
       <input key="log1" type="text" id="username" value={props.username} placeholder="Username" onChange={e => props.updateUsername(e.target.value)} />
       <input key="log2" type="password" id="password" value={props.password} placeholder="Password" onChange={e => props.updatePassword(e.target.value)}/>
       <button key="log3" className="logButton" type="submit">Submit</button>
     </form>
   </div>
   <div key="signForm" id="sign">
     SIGN UP:
     <form key="signForm" id="submit" onSubmit={e => {
     e.preventDefault();
     props.signup();
       }}> 
       <input key="sign1" type="text" id="signUser" value={props.username} placeholder="Username" onChange={e => props.updateUsername(e.target.value)}/>
       <input key="sign2" type="password" id="signPass" value={props.password} placeholder="Password" onChange={e => props.updatePassword(e.target.value)}/>
       {'   Apt# '} 
       <select value={props.apt} onChange={e => props.updateApt(e.target.value)}>
         <option>Select</option>
         {aptDrop}
       </select>
       {'   Role  '}
       <select value={props.role} onChange={e => props.updateRole(e.target.value)} >
         <option>Select</option>
         <option value="Tenant">Tenant</option>
         <option value="Manager">Manager</option>
         <option value="Maintenance">Maintenance</option>
         </select>
       <button key="sign3" className="logButton" type="submit">Submit</button>
     </form>
   </div>
 </div>
      ) : (
        <Redirect to='/content' />
      )}
   </div>
)};
export default connect(mapStateToProps, mapDispatchToProps)(Login);