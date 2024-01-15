import React, {createContext} from "react";
import io from "socket.io-client";
import { serverApi } from "../../lib/config.ts";

export const socket = io(serverApi);
export const SocketContext = createContext();