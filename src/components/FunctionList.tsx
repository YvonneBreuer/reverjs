import * as React from "react";

import { FunctionContainer } from "../types";
import { FunctionCode } from "./FunctionCode";

type ListProps = {
  functions: Array<FunctionContainer>;
};

const toggleOpen = (e: React.MouseEvent<HTMLElement>) => {
  let el = e.target as HTMLElement;
  if (el.nodeName === "SPAN") {
    el = (e.target as HTMLElement).parentElement as HTMLElement;
  }
  el?.parentElement?.classList.toggle("open");
};

const handleNumericLiteral = (input: string): string => {
  const num: number = Number(input);
  if (isNaN(num)) {
    if (input !== "window") return `.${input}`;
    else return input;
  } else {
    return `[${num}]`;
  }
};

export const FunctionList = ({ functions }: ListProps) => {
  return (
    <div className="reverjs-function-list">
      {functions.map((item) => (
        <div key={item.name}>
          <div
            className="reverjs-button reverjs-function-name"
            onClick={toggleOpen}
          >
            {item.name}: {item.signature}
            <span> - accessible via </span>
            {item.accessibility.map((obj) => (
              <span key={obj.name}>{handleNumericLiteral(obj.name)}</span>
            ))}
            <span>.{item.name}</span>
          </div>
          <div className="reverjs-function-code-container">
            <FunctionCode functionContainer={item} />
          </div>
        </div>
      ))}
    </div>
  );
};
