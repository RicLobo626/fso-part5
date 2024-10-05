import ReactDOM from "react-dom/client";
import App from "@/App";
import { AuthContextProvider, NotificationContextProvider } from "@/contexts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
