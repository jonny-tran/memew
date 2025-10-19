import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { ProductModalProvider } from "@/contexts/product-modal-context";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <ProductModalProvider>
          <AppRoutes />
        </ProductModalProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
