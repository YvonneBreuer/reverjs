import * as React from "react";

const toggleOpen = () => {
  document.getElementById("reverjs-header")?.classList.toggle("open");
};

export default class Header extends React.Component<object, object> {
  render() {
    return (
      <div className="reverjs-header" id="reverjs-header">
        <div
          className="reverjs-button reverjs-header-button"
          onClick={toggleOpen}
        >
          reverjs
        </div>
      </div>
    );
  }
}
