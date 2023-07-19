import * as React from "react";
import { ModuleContext, MODULES, Module } from "@pages/panel/Panel";
import { useContext } from "react";

type Props = { setSelected: (module: Module) => void };
export function Header(props: Props) {
  const { setSelected } = props;
  const selected = useContext(ModuleContext);
  return (
    <div className="navbar bg-base-100 pr-6">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Omni</a>
      </div>

      <div className="navbar-end lg:flex">
        <ul className="menu menu-horizontal px-1 bg-base-200">
          {Object.values(MODULES).map((module) => (
            <HeaderItem
              key={JSON.stringify(module)}
              selected={selected}
              module={module}
              onClick={() => setSelected(module)}
            />
          ))}
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
  const selfSelected = selected === module;
  const moduleDisName = Object.values(module)[0];
  return (
    <li>
      <a onClick={onClick} className={selfSelected ? "active" : ""}>
        {moduleDisName}
      </a>
    </li>
  );
};
