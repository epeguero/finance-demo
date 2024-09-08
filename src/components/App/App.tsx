import { useState } from "react";
import { Overview } from "../Overview/Overview";
import { Sidebar } from "../Sidebar/Sidebar";
import "./App.css";
import { Page } from "../../types/types";
import { Budgets } from "../Budget/Budget";

function App() {
  const [page, setPage] = useState<Page>("overview");
  return (
    <div className="App">
      <Sidebar currentPage={page} onPageSelect={setPage} />
      {(
        {
          overview: () => <Overview />,
          pots: () => <div>Unimplemented</div>,
          budgets: () => <Budgets />,
          transactions: () => <div>Unimplemented</div>,
          "recurring-bills": () => <div>Unimplemented</div>,
        } satisfies Record<Page, () => JSX.Element>
      )[page]()}
    </div>
  );
}

export default App;
