import { Sidebar } from "../Sidebar/Sidebar";
import {
  NavigationProvider,
  useNavigationContext,
} from "../../hooks/Navigation";
import "./App.css";

function App() {
  return (
    <NavigationProvider>
      <div className="App">
        <Sidebar />
        <PageComponent />
      </div>
    </NavigationProvider>
  );
}

function PageComponent() {
  const {
    current: { PageComponent },
  } = useNavigationContext();
  return <PageComponent />;
}

export default App;
