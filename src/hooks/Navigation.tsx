import React, { createContext, useContext, useState } from "react";
import { Page } from "../types/types";
import { Overview } from "../components/Overview/Overview";
import { Budgets } from "../components/Budget/Budget";

const Unimplemented = () => <div>Unimplemented</div>;

const pages: Record<Page, React.ComponentType> = {
  Overview: Overview,
  Pots: Unimplemented,
  Budgets: Budgets,
  Transactions: Unimplemented,
  RecurringBills: Unimplemented,
};

export type NavigationProps = {
  navigate: (_: Page) => void;
  current: { page: Page; PageComponent: React.ComponentType };
};
export const NavigationContext = createContext<undefined | NavigationProps>(
  undefined
);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState<Page>(Page.Overview);
  return (
    <NavigationContext.Provider
      value={{
        navigate: setPage,
        current: { page, PageComponent: pages[page] },
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
