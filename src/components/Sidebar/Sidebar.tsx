import { useState } from "react";
import { Page } from "../../types/types";

import { ReactComponent as LogoSmallIcon } from "../../assets/images/logo-small.svg";
import { ReactComponent as LogoLargeIcon } from "../../assets/images/logo-large.svg";
import { ReactComponent as OverviewIcon } from "../../assets/images/icon-nav-overview.svg";
import { ReactComponent as TransactionsIcon } from "../../assets/images/icon-nav-transactions.svg";
import { ReactComponent as BudgetsIcon } from "../../assets/images/icon-nav-budgets.svg";
import { ReactComponent as PotsIcon } from "../../assets/images/icon-nav-pots.svg";
import { ReactComponent as RecurringBillsIcon } from "../../assets/images/icon-nav-recurring-bills.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/images/icon-minimize-menu.svg";

import "./Sidebar.css";
import { useNavigationContext } from "../../hooks/Navigation";

export const Sidebar = () => {
  const {
    navigate,
    current: { page },
  } = useNavigationContext();
  const [isMaximized, setIsMaximized] = useState(false);
  return (
    <div className="sidebar" data-maximized={isMaximized}>
      <div>
        <LogoSmallIcon className="small-logo" />
      </div>
      <div>
        <LogoLargeIcon className="large-logo" />
      </div>
      <div
        onClick={() => navigate(Page.Overview)}
        data-selected={page === Page.Overview}
      >
        <OverviewIcon className="overview-icon" />
        <span>Overview</span>
      </div>
      <div
        onClick={() => navigate(Page.Transactions)}
        data-selected={page === Page.Transactions}
      >
        <TransactionsIcon className="transactions-icon" />
        <span>Transactions</span>
      </div>
      <div
        onClick={() => navigate(Page.Budgets)}
        data-selected={page === Page.Budgets}
      >
        <BudgetsIcon className="budgets-icon" />
        <span>Budgets</span>
      </div>
      <div
        onClick={() => navigate(Page.Pots)}
        data-selected={page === Page.Pots}
      >
        <PotsIcon className="pots-icon" />
        <span>Pots</span>
      </div>
      <div
        onClick={() => navigate(Page.RecurringBills)}
        data-selected={page === Page.RecurringBills}
      >
        <RecurringBillsIcon className="recurring-bills-icon" />
        <span>Recurring Bills</span>
      </div>
      <MaxMinimizeButton onClick={() => setIsMaximized(!isMaximized)} />
    </div>
  );
};

const MaxMinimizeButton = ({
  onClick,
  className,
  ...divProps
}: React.ComponentProps<"div">) => (
  <div
    className={`${className ?? ""} maximize-button`}
    onClick={onClick}
    {...divProps}
  >
    <LeftArrowIcon />
  </div>
);
