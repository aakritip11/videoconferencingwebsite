import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useUser } from "./UserContext";

const Room = () => {
  const { roomID } = useParams();
  const userDetails = useUser(); 

  const meeting = async (element) => {
    // const appID = "add your appID from zegocloud";
    // const serverSecret = "add your serverSecret from zegocloud";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      userDetails.name 
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
      if(zp){
        zp.joinRoom({
          container: element,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
          
        });
      }else {
        console.log("Failed to create ZegoUIKitPrebuilt instance.");
      }
  };
  
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div
        ref={meeting}
        className="italic font-bold text-[25px] text-teal-800 w-full h-full flex justify-center mt-7">
        If it doesn't get loaded, please refresh.
      </div>
    </div>
  );
  
};

export default Room;
