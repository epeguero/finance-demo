import { ReactComponent as CaretRightIcon } from "../../assets/images/icon-caret-right.svg";
import { ReactComponent as CaretDownIcon } from "../../assets/images/icon-caret-down.svg";
import "./Utility.css";
import { Budget } from "../../types/types";
import React, { useEffect, useRef, useState } from "react";

// safer "Static variable" emulation with closure
const ix = (() => {
  let curr = -1;
  return () => {
    curr = curr + 1;
    return curr;
  };
})();

export const AmountWithLabel = ({
  label,
  amount,
  cents = false,
  color,
  className,
  ...divProps
}: {
  label: string;
  amount: number;
  cents?: boolean;
  color: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`amount-with-label ${className ?? ""}`} {...divProps}>
    <div style={{ backgroundColor: color }} className="colorbar"></div>
    <span>{label}</span>
    <span>{formatCurrency(amount, cents)}</span>
  </div>
);

export const Card = ({
  children,
  className,
  ...rest
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card ${className ?? ""}`} {...rest}>
    {children}
  </div>
);

export const CardHeader = ({
  title,
  actionButton,
}: {
  title: React.ReactNode;
  actionButton?: React.ReactNode;
}) => (
  <div className="card-header">
    <span>{title}</span>
    {actionButton}
  </div>
);

export const CaretLink = ({
  title,
  className,
  onClick,
}: { title: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`caret-link ${className ?? ""}`} onClick={onClick}>
    <span>{title}</span>
    <CaretRightIcon />
  </div>
);

export const Circle = ({ color }: { color: string }) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius: "100%",
      height: "0.85rem",
      width: "0.85rem",
    }}
  ></div>
);

export const useDialog = (): {
  Dialog: React.FC<React.PropsWithChildren>;
  close: () => void;
  open: () => void;
} => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => {
    dialogRef.current?.showModal();
    dialogRef.current?.setAttribute("data-open", "true");
  };
  const close = () => {
    dialogRef.current?.setAttribute("data-open", "false");
    setTimeout(() => {
      dialogRef.current?.close();
    }, 500);
  };
  const Dialog: React.FC<React.PropsWithChildren> = ({ children }) => (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === "DIALOG") {
          close();
        }
      }}
    >
      {children}
    </dialog>
  );

  return { open, close, Dialog };
};

export const ColorBar = ({ color }: { color: string }) => (
  <div style={{ backgroundColor: color }} className="colorbar"></div>
);

type SelectOption<T extends React.ReactNode> = {
  value: T;
  render: React.ReactElement;
};
export const Select = <T extends React.ReactNode>({
  title,
  options,
  onSelect,
  ...selectProps
}: {
  title?: string;
  options?: SelectOption<T>[];
  onSelect?: (_: SelectOption<T>) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption<T>>();
  const dropdownRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      console.log(!dropdownRef.current?.contains(e.target as Node));
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  });
  return (
    <div className="select">
      <span>{title}</span>
      <select {...selectProps} hidden>
        {options?.map(({ value }, i) => (
          <option key={`select-${ix()}-option-${i}`}>{value}</option>
        ))}
      </select>
      <div
        className="ul"
        onClick={(e) => {
          setOpen(!open);
          e.stopPropagation();
        }}
      >
        <div className="selection">
          <div>{selected?.render}</div>
          <CaretDownIcon />
        </div>
        <ul ref={dropdownRef} data-open={open}>
          <Card>
            <Intersperse
              Separator={
                (() => <Divider margin={5} />) satisfies React.ComponentType<{
                  key: string;
                }>
              }
            >
              {options?.map((option, i) => (
                <li
                  key={`select-${ix()}-li-${i}`}
                  onClick={() => {
                    setSelected(option);
                    onSelect?.(option);
                  }}
                >
                  {option.render}
                </li>
              ))}
            </Intersperse>
          </Card>
        </ul>
      </div>
    </div>
  );
};

export const MoneyInput = ({ title }: { title?: string }) => (
  <div className="money-input">
    <span>{title}</span>
    <input placeholder={"e.g. 2000"} />
  </div>
);

export const Divider: React.FC<{ margin?: number }> = ({ margin }) => (
  <div className="divider" style={margin ? { margin: `${margin}px` } : {}} />
);

export const Intersperse = ({
  children,
  Separator,
}: {
  children?: React.ReactNode[];
  Separator: React.FC<any>;
}): JSX.Element => {
  return (
    <>
      {(children?.length ?? 0) <= 1
        ? children
        : children
            ?.flatMap((child) => [<Separator key={`sep-${ix()}`} />, child])
            .slice(1)}
    </>
  );
};

export const PieChart = ({ budgets }: { budgets: Budget[] }) => {
  const budgetAllocated = budgets.reduce((acc, b) => acc + b.maximum, 0);
  const budgetRemaining = budgets.reduce((acc, b) => acc + b.remaining, 0);
  const budgetSegments = budgets.map(
    (b) => (b.maximum / budgetAllocated) * 360
  );
  const conicSegments = budgetSegments.reduce(
    (acc, b, ix) => ({
      accumSegments: acc.accumSegments + b,
      conicSegments: [
        ...acc.conicSegments,
        `${budgets[ix].theme} ${acc.accumSegments}deg ${acc.accumSegments + b}deg`,
      ],
    }),
    { accumSegments: 0, conicSegments: [] as string[] }
  ).conicSegments;

  // e.g.:
  //"conic-gradient(green 0deg 20deg, lightblue 20deg 200deg, rgb(242, 205, 172) 200deg 240deg, rgb(98, 96, 112) 240deg 360deg)"

  return (
    <div
      className="pie-chart budget-indicator"
      style={{
        background: `
        radial-gradient(
          circle at center,
          white 0% 45%,
          rgba(255, 255, 255, 0.5) 45% 52%,
          transparent 52% 100%
        ),
        conic-gradient(${conicSegments.join(", ")})
        `,
      }}
    >
      <span>{formatCurrency(budgetRemaining)}</span>
      <span>of {formatCurrency(budgetAllocated)} limit</span>
    </div>
  );
};

export const formatCurrency = (value: number, cents: boolean = false) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
  });
