import * as React from "react";

import { FunctionContainer } from "../types";

type FunctionProps = {
  functionContainer: FunctionContainer;
};

export const FunctionCode = ({ functionContainer }: FunctionProps) => {
  return (
    <pre className="reverjs-function-code">
      {functionContainer.ref.toString()}
    </pre>
  );
};
