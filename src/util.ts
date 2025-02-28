/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { FunctionContainer, ObjectContainer } from "./types";
import { recursionLevel } from "./index";

// code from https://stackoverflow.com/a/17246535
export const detectCustomProperties = (): Array<string> => {
  // create an iframe and append to body to load a clean window object
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // get the current list of properties on window
  const currentWindow = Object.getOwnPropertyNames(window);
  // filter the list against the properties that exist in the clean window
  const results = currentWindow.filter(function (prop) {
    return !iframe.contentWindow?.hasOwnProperty(prop);
  });
  document.body.removeChild(iframe);
  return results;
};

// code from https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
const getProperty = <T, K extends keyof T>(o: T, propertyName: K): T[K] => {
  return o[propertyName];
};

const extractFunctionSignature = (full: string): string => {
  const arrowIndex = full.indexOf("=>");
  const bracketIndex = full.indexOf(")");
  if (arrowIndex != -1 && bracketIndex != -1 && bracketIndex < arrowIndex) {
    return full.substring(0, bracketIndex + 1);
  } else if (
    arrowIndex != -1 &&
    bracketIndex != -1 &&
    bracketIndex > arrowIndex
  ) {
    return full.substring(0, arrowIndex);
  } else if (bracketIndex != -1) {
    return full.substring(0, bracketIndex + 1);
  } else if (arrowIndex != -1) {
    return full.substring(0, arrowIndex);
  } else {
    return "";
  }
};

export const identifyFunctionProperties = (
  functions: Array<FunctionContainer>,
  objects: Array<ObjectContainer>,
  properties: Array<string>,
  accessibility: Array<ObjectContainer>
) => {
  for (const property of properties) {
    if (["0", "NotifyPaintEvent", "__awaiter"].includes(property)) continue;

    const objectRef: object = accessibility[accessibility.length - 1].object;
    let propertyRef;

    // some properties might not be accessible
    try {
      propertyRef = getProperty(objectRef, property as never);
    } catch (e) {
      console.log((e as Error).message);
      continue;
    }

    const propertyType: string = typeof propertyRef;

    if (propertyType === "function") {
      const functionContent = (propertyRef as Function).toString();
      const functionSignature = extractFunctionSignature(functionContent);
      const funcString: string = functionContent;

      if (!funcString.includes("[native code]")) {
        const container: FunctionContainer = {
          name: property,
          signature: functionSignature,
          ref: propertyRef,
          accessibility: [...accessibility], // Clone accessibility array
        };
        functions.push(container);
      }
    } else if (propertyType === "object") {
      const result = objects.find((item) => item.object === propertyRef);
      if (result != undefined || propertyRef === null) continue;

      const newObject = { name: property, object: propertyRef };
      objects.push(newObject);

      const accessibilityClone = [...accessibility, newObject]; // Clone and add new object

      if (accessibilityClone.length > recursionLevel) continue;

      identifyFunctionProperties(
        functions,
        objects,
        Object.getOwnPropertyNames(propertyRef),
        accessibilityClone
      );
    }
  }
};
