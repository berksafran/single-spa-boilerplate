/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { listenMessage, sendMessage } from "@safran/utilities";
import "./assets/styles/global.css";

export default function Header(props) {
  const [rootMessage, setRootMessage] = useState("");
  const [childMessage, setChildMessage] = useState("");

  useEffect(() => {
    console.log("Header: incoming props :>> ", props);
    listenMessage((e) => {
      const { to, message } = e.detail;
      if (to === "header") setRootMessage(message);
    });
  }, [props]);

  const sendMessageToChilds = () => {
    sendMessage("content", childMessage);
  };

  return (
    <section className="container mx-auto flex flex-col space-y-5 p-20 pt-10 pb-12 bg-gray-200 text-gray-500 border-2 border-dashed border-gray-700 border-t-0">
      <p className="text-500 text-2xl pb-10 font-semibold">{props.name}</p>
      <div className="text-slate-800 font-mono">
        <p>Incoming Props (from root-app):</p>
        <p className="m-2 p-2 bg-slate-600 text-white text-sm">{props?.text}</p>
        <p className="m-2 p-2 bg-slate-600 text-white text-sm">
          {Object(props?.auth).hasOwnProperty("firstName")
            ? `Welcome ${props.auth.firstName}!`
            : "Has not logged in yet!"}
        </p>
      </div>
      <div className="text-slate-800 font-mono">
        <p>Received message (from CustomEvents):</p>
        <p className="m-2 p-2 bg-orange-300 text-orange-700 text-sm">
          {rootMessage || "Not received any messages"}
        </p>
      </div>
      <div className="text-slate-800 font-mono">
        <p>Sent message to other child apps:</p>
        <div className="flex flex-row items-center space-x-2">
          <input
            className="m-2 p-2 bg-gray-400 text-white rounded-md"
            value={childMessage}
            onChange={(e) => setChildMessage(e.target.value)}
          />
          <button
            className="m-2 p-2 bg-gray-600 text-white rounded-md"
            onClick={sendMessageToChilds}
          >
            Send Message!
          </button>
        </div>
      </div>
    </section>
  );
}
