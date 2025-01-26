import React from "react";

import { FunctionContainer } from "../types";
import { FunctionList } from "./FunctionList";
import Header from "./Header";
import "./app.scss";

type AppProps = {
  functions: Array<FunctionContainer>;
};

export const AppContainer = ({ functions }: AppProps) => {
  return (
    <div className="reverjs-app-container">
      <Header></Header>
      <div className="reverjs-stats">{functions.length} functions</div>
      <div className="reverjs-function-container">
        <FunctionList functions={functions} />
      </div>
    </div>
  );
};
