import { Sidebar } from "../Sidebar/Sidebar";
import {
  NavigationProvider,
  useNavigationContext,
} from "../../hooks/Navigation";
import "./App.css";
import { FinancialsProvider } from "../../hooks/Financials";

function App() {
  return (
    <FinancialsProvider>
      <NavigationProvider>
        <div className="App">
          <Sidebar />
          <PageComponent />
        </div>
      </NavigationProvider>
    </FinancialsProvider>
  );
}

function PageComponent() {
  const {
    current: { PageComponent },
  } = useNavigationContext();
  return <PageComponent />;
}

export default App;
