// Room.js
import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useUser } from "./UserContext"; // Import useUser hook

const Room = () => {
  const { roomID } = useParams();
  const userDetails = useUser(); // Access userDetails from context

  const meeting = async (element) => {
    const appID = 1535546174;
    const serverSecret = "f2a0b86ccb9866e1cfc929d8e3d7cbfa";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      userDetails.name // Use the username from userDetails
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
