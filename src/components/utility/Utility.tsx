import { ReactComponent as CaretRightIcon } from "../../assets/images/icon-caret-right.svg";
import "./Utility.css";
import { Budget } from "../../types/types";

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
  <div className={`amount-with-label ${className}`} {...divProps}>
    <div style={{ backgroundColor: color }} className="colorbar"></div>
    <span>{label}</span>
    <span>{formatCurrency(amount, cents)}</span>
  </div>
);

export const Card = ({
  children,
  className,
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`card ${className ?? ""}`}>{children}</div>
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
}: { title: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`caret-link ${className ?? ""}`}>
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

export const ColorBar = ({ color }: { color: string }) => (
  <div style={{ backgroundColor: color }} className="colorbar"></div>
);

export const Divider = () => <div className="divider" />;

// safer "Static variable" emulation with closure
const ix = (() => {
  let curr = -1;
  return () => {
    curr = curr + 1;
    return curr;
  };
})();

export const Intersperse = ({
  children,
  Separator,
}: {
  children?: React.ReactNode[];
  Separator: React.ComponentType;
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
