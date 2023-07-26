// @flow
import * as React from "react";
import ReactJson from "react-json-view";
import { useState } from "react";
import { useBoolean } from "ahooks";

type Props = NonNullable<unknown>;

export function JsonTab(props: Props) {
  const [json, setJson] = useState<string>("{}");
  const [showTypes, { toggle }] = useBoolean(false);

  return (
    <div>
      <div className="flex w-full justify-end ">
        <div className="join-vertical join">
          <div className="flex items-center">
            <span className="text-primary-focus pr-1">Types</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={showTypes}
              onChange={toggle}
            />
          </div>
        </div>
      </div>
      <div
        className="w-full flex mt-2"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div className="flex-1 min-h-full">
          <textarea
            placeholder="Json string here..."
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="textarea textarea-bordered min-h-full w-full "
          ></textarea>
        </div>

        <div className="divider divider-horizontal px-10">
          <button className="btn btn-outline" onClick={() => {
            if (!isJson(json)) return
            setJson(JSON.stringify(JSON.parse(json), null, 2))
          }}>Format</button>
        </div>

        <div className="flex-1 min-h-full bg-base-300">
          {isJson(json) ? (
            <ReactJson
              style={{
                maxHeight: "100%",
                overflowY: "scroll",
              }}
              src={JSON.parse(json)}
              theme="rjv-default"
              displayDataTypes={showTypes}
            />
          ) : (
            <ErrorPlaceHolder />
          )}
        </div>
      </div>
    </div>
  );
}

const isJson = (val: string) => {
  try {
    JSON.parse(val);
    return true;
  } catch (e) {
    return false;
  }
};

const ErrorPlaceHolder = () => {
  return (
    <div className="hero bg-error-content/40 min-h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Oops</h1>
          <p className="py-6">Invalid Json</p>
        </div>
      </div>
    </div>
  );
};
