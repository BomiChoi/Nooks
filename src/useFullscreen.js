import React, { useRef } from "react";

const useFullscreen = (callback) => {
  const element = useRef();
  const runCb = (isFull) => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullscreen) {
        element.current.requestFullscreen();
      } else if (element.current.mozRequestFullscreen) {
        element.current.mozRequestFullscreen();
      } else if (element.current.webkitRequestFullscreen) {
        element.current.webkitRequestFullscreen();
      } else if (element.current.msRequestFullscreen) {
        element.current.msRequestFullscreen();
      }
      runCb(true);
    }
  };

  const exitFull = () => {
    if (document.fullscreenElement !== null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      runCb(false);
    }
  };
  return { element, triggerFull, exitFull };
};

export default function App() {
  const callback = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen();
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <div ref={element}>
        <img src="https://mblogthumb-phinf.pstatic.net/MjAxODA0MjRfNDkg/MDAxNTI0NTM2NjAwNTQw.IddxA8-dF1o5mTaOwiJqesGQwyEDYYXYiYKmdV-WSMUg.1Rm40HP8qmd2PMAVhm5cyKtlHeifbI2GSnT6FTOncJsg.JPEG.dmm_korea/%ED%92%8D%EA%B2%BD%EC%98%81%EC%96%B4%EB%A1%9C_%EC%97%94%EA%B5%AC%ED%99%94%EC%83%81%EC%98%81%EC%96%B41.jpg?type=w800" />
        <button onClick={exitFull}>Exit fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make fullscreen</button>
    </div>
  );
}
