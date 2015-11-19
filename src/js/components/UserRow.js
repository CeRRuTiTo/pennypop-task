import React, {Component} from "react";

export default ({id, first_name, last_name, username}) => (
  <tr>
    <th>{id}</th>
    <th>{first_name}</th>
    <th>{last_name}</th>
    <th>{username}</th>
  </tr>
);
