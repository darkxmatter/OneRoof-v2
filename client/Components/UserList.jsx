import React from 'react';


function UserList(props) {
  return (
    <div>
      <ul>
        {props.userList.map(element => {
          return (
            <li className="listItemContainer" onClick={()=>{props.handleChange(element.user_id, element.name)}}>
              <a className ='listItem' >
                {element.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UserList;