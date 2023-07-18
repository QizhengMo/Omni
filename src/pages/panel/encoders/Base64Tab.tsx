import React from "react";
import {ActionButton} from "@src/componenst/ActionButton";
import {ToolAreaHeader} from "@src/componenst/ToolAreaHeader";
import {EncodersTextArea} from "@src/componenst/EncodersTextArea";
import {SizeDisplay} from "@pages/panel/encoders/SizeDisplay";

export const Base64Tab = () => {
  const [source, setSource] = React.useState("");
  const [encoded, setEncoded] = React.useState("");
  const handleEncode = () => {
    setEncoded(btoa(source));
  };

  const handleDecode = () => {
    setSource(atob(encoded))
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <ToolAreaHeader
          name={"Source"}
          actions={
            <div>
              <SizeDisplay source={source} />
              <ActionButton onClick={handleEncode}>Encode</ActionButton>
            </div>          }
        />
        <EncodersTextArea
          onInput={(e) => {
            setSource(e.currentTarget.value);
          }}
          style={{ minHeight: "100px" }}
          value={source}
        />

        <ToolAreaHeader
          name={"Encoded"}
          actions={
            <div>
              <SizeDisplay source={source} />
              <ActionButton onClick={handleDecode}>Decode</ActionButton>
            </div>
          }
        />
        <EncodersTextArea
          value={encoded}
          onInput={(e) => {
            setEncoded(e.currentTarget.value);
          }}
          style={{ minHeight: "100px" }}
        />
      </div>
    </div>
  );
};
