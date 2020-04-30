import { NetworkInfo } from "react-native-network-info";

export const GetIP = NetworkInfo.getIPAddress().then(ipAddress => {
    return ipAddress
  });