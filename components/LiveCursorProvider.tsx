"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresense, updateMyPresense] = useMyPresence();
  const others = useOthers();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Update from clientX and clientY o PageX and PageY for full page tracking
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresense({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresense({ cursor: null });
  };

  return (
    <div onPointerMove={handlePointerMove} onPointerCancel={handlePointerLeave}>
      {others.filter((other)=>other.presence.cursor!=null).map(({connectionId,presence,info})=>(
        <FollowPointer
            key={connectionId}
            info={info}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
        />

      ))}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
