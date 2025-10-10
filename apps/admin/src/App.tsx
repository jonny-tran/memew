import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { ProductModalProvider } from "@/contexts/product-modal-context";

function App() {
  return (
    <Router>
      <ProductModalProvider>
        <AppRoutes />
      </ProductModalProvider>
    </Router>
  );
}

export default App;
