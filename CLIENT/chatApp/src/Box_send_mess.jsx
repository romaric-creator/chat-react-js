import React, { useState } from "react";
import axios from "axios";
export default function Box_send_mess() {
  const [file,setfichier] = useState(null);
  const [message,setmess] = useState('');
  const [valeur,setvsleur] = useState(message);
  const handlefile = (event) => {
    setfichier(event.target.file[0]);
}
  const onSubmit = (e) => {
    e.preventDefault();
      const iduserRes = localStorage.getItem("idres");
      const id = localStorage.getItem("userId");
       const res = axios.post(`http://localhost:5000/api/message`,{
        mess: message,
        idcon: id,
        idres: iduserRes
       });
        if(res){
          console.log("yes");
          e.target.reset();

        }else{
          console.log("erreur");
        }
  };
  return (
    <form onSubmit={onSubmit} className="nav">
      <div className="nav">
        <input type="file" id="file-mess"/>
        <label htmlFor="file-mess">
          <span className=" icon-link2"></span>
        </label>
          <input
            type="text"
            className="send-mess"
            onChange={(event) => setmess(event.target.value)}
          />
          <input type="submit" id="sub" />{" "}
          <label htmlFor="sub">
            <span className="icon-send"></span>
          </label>
      </div>
    </form>
  );
}
