import React, { useEffect, useState } from "react";

export default function Box_message_con() {
  const [dis, setDis] = useState([]);
  const id = localStorage.getItem("idres");
  const userid = localStorage.getItem("userId");
  const se = new Date().getMilliseconds();
  useEffect(() => {

    const instant = setInterval(() => {
      fetch(`http://localhost:5000/api/conve?idUS=${userid}&idusC=${id}`)
        .then((Response) => Response.json())
        .then((data) => {
          setDis(data);
        })
        .catch((erreur) => console.error("erreur de selection", erreur));
    }, 100);
    return () => clearInterval(instant);
  }, [se]);
  return (
    <div className="message-box" id="bme">
      {dis.map((discr) => (
        <div
          className={discr.iduserCon == userid ? "post rigth" : "post"}
          key={discr.id_mess}
        >
          <div className="message">
            <div className="pp">
              <span className="icon-user"></span>
            </div>
            <div className="desc">
              <div className="nad">
                <p className="mess">{discr.contenu}</p>
              </div>
              <p className="send-last">{discr.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
