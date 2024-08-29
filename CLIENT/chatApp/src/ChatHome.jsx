import React, { useEffect, useState } from "react";
import Box_LIst from "./composants/Box_LIst";
import "./Css/box-message.css";
import "./Css/box-list.css";
import "./Css/box.css";
import "./icomoon/style.css";
import Box_message from "./composants/Box_message";
import List_us from "./composants/List_us";
import Box_search from "./composants/Box_search";
import Box_head_mes from "./composants/Box_head_mes";
import Box_message_con from "./composants/Box_message_con";
import Box_send_mess from "./Box_send_mess";
// import { Navigate, useFetcher, useFetchers } from "react-router-dom";

export default function ChatHome() {
  const [query,setSearch] = useState([]);
  const [user,setUSer] = useState([]);
  const [val,setval] = useState('');
  return (
    <div className="contenair">
      <div className="box">
        <Box_LIst>
      <h1 className="hed">Messages</h1>
          <Box_search setval={setval} query={query} setSearch={setSearch} setUSer={setUSer}/>
          <List_us val={val} query={query} user={user}/>          
        </Box_LIst>
        <Box_message>
          <Box_head_mes/>
          <Box_message_con/>
          <Box_send_mess/>
        </Box_message>
      </div>
    </div>
  );
}
