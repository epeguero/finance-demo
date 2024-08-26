import { Overview } from '../Overview/Overview';
import { Sidebar } from '../Sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar currentPage={'overview'}/>
      <Overview/>
    </div>
  );
}

export default App;
