import * as React from "react";
import { createRoot, Root } from "react-dom/client";

import { AppContainer } from "./components/AppContainer";
import { FunctionContainer, ObjectContainer } from "./types";
import { detectCustomProperties, identifyFunctionProperties } from "./util";

export const recursionLevel: number = 10;

const functions: Array<FunctionContainer> = [];
const objects: Array<ObjectContainer> = [];
const properties: Array<string> = detectCustomProperties();
const init: Array<ObjectContainer> = [{ name: "window", object: window }];
identifyFunctionProperties(functions, objects, properties, init);

const div = document.createElement("div");
document.body.appendChild(div);

const root: Root = createRoot(div);
root.render(<AppContainer functions={functions} />);
