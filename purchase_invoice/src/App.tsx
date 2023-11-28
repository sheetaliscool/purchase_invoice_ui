import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import { AddPurchaseInvoiceRecord } from './components/AddPurchaseInvoiceRecord';
import { PurchaseInvoiceTabList } from './components/PurchaseInvoiceTabList';
function App() {
  
  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/purchase-invoice" element={<PurchaseInvoiceTabList />} />
          <Route path="/add-purchase-invoice" element={<AddPurchaseInvoiceRecord />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  );
}

export default App;
