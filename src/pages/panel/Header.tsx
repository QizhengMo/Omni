import * as React from "react";
import { ModuleContext, MODULES, Module } from "@pages/panel/Panel";
import { useContext, useState } from "react";

type Props = { setSelected: (module: Module) => void };

export function Header(props: Props) {
  const { setSelected } = props;
  const selected = useContext(ModuleContext);
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar bg-base-100 pr-6 h-12 flex items-start">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Omni</a>
      </div>

      <div className="navbar-end lg:flex ">
        <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
          <li>
            <span
              onClick={() => {
                setOpen((old) => !old);
              }}
              className={
                "menu-dropdown-toggle" + (open ? "menu-dropdown-show" : "")
              }
            >
              {selected.displayName}
            </span>
            <ul
              className={"menu-dropdown" + (open ? "menu-dropdown-show" : "")}
            >
              {Object.values(MODULES).map((module) => (
                <HeaderItem
                  key={JSON.stringify(module)}
                  selected={selected}
                  module={module}
                  onClick={() => {
                    setOpen(false);
                    setSelected(module);
                  }}
                />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

type HeaderItemProps = {
  module: Module;
  selected: Module;
  onClick: () => void;
};
const HeaderItem = (props: HeaderItemProps) => {
  const { module, onClick, selected } = props;
  const moduleDisName = Object.values(module)[0];
  return (
    <li>
      <a className={module === selected ? "active" : ""} onClick={onClick}>
        {moduleDisName}
      </a>
    </li>
  );
};
