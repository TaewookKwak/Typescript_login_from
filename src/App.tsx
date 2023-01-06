import { Suspense, useEffect } from "react";
import "@/assets/css/App.css";
import { getItem, getSessionStorage } from "@services/sessionStorage/session";

import MyRoutes from "@/routes/MyRoutes";
import LoadingSpinner from "@/components/loadingSpinner";
import ContextSocketPriovider, {
  SocketContext,
} from "@/contexts/ContextSocketPriovider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import socketIOClient from "socket.io-client";

function App() {
  const auth = getItem("auth");
  const client = new QueryClient();
  // const queryClient = useQueryClient();

  useEffect(() => {
    const webSocket = socketIOClient("http://192.168.219.204:8093/");
    webSocket.on("updateSensorData", (data) => {
      client.setQueryData("sensorData", data);
    });
    return () => {
      webSocket.close();
    };
  }, []);
  return (
    // <ContextSocketPriovider>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Suspense fallback={<LoadingSpinner />}>
        {/* Router setting */}

        <MyRoutes />
      </Suspense>
    </QueryClientProvider>
    // </ContextSocketPriovider>
  );
}

export default App;
