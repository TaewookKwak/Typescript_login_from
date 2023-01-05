import React, { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const SocketContext = createContext<any>({});

type Props = {
  children?: React.ReactNode;
};

const ContextSocketPriovider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);
  //   useEffect(() => {
  //     // 1. 웹소켓 클라이언트 객체 생성
  //     // const webSocket = new WebSocket("ws://localhost:5000");
  //     const webSocket = new WebSocket("ws://192.168.219.118:8093/");
  //     webSocket.onopen = () => {
  //       console.log("웹소켓서버와 연결 성공");
  //     };
  //     // 2-2) 메세지 수신 이벤트 처리
  //     webSocket.onmessage = function (event: MessageEvent<any>) {
  //       console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
  //       console.log(event.data);

  //       setSocket(event.data);
  //     };
  //     // 2-3) 연결 종료 이벤트 처리
  //     webSocket.onclose = function () {
  //       console.log("서버 웹소켓 연결 종료");
  //       setSocket(null);
  //     };
  //     // 2-4) 에러 발생 이벤트 처리
  //     webSocket.onerror = function (event: Event) {
  //       console.log(event);
  //       setSocket(null);
  //     };

  //     return () => {};
  //   }, []);

  useEffect(() => {
    const webSocket = socketIOClient("http://192.168.219.118:8093/");
    webSocket.on("updateSensorData", (data) => {
      // when we recieve a chat, add it into our messages array in state
      console.log(data);
    });
    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default ContextSocketPriovider;
