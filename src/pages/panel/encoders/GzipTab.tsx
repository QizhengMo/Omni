import React from "react";
import pako from "pako";
import { ActionButton } from "@src/componenst/ActionButton";
import { ToolAreaHeader } from "@src/componenst/ToolAreaHeader";
import { EncodersTextArea } from "@src/componenst/EncodersTextArea";
import { SizeDisplay } from "@pages/panel/encoders/SizeDisplay";
import {base64ToBytes, bytesToBase64} from "@pages/panel/encoders/utils";

export const GzipTab = () => {
  const [source, setSource] = React.useState("");
  const [compressed, setCompressed] = React.useState("");

  const handleCompress = () => {
    setCompressed(compress(source));
  };

  const handleDecode = () => {
    setSource(decompress(compressed));
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <ToolAreaHeader
          name={"Source"}
          actions={
            <div>
              <SizeDisplay source={source} />
              <ActionButton onClick={handleCompress}>Compress</ActionButton>
            </div>
          }
        />
        <EncodersTextArea
          onInput={(e) => {
            setSource(e.currentTarget.value);
          }}
          value={source}
          style={{ minHeight: "300px" }}
        />

        <div style={{ height: 24 }} />

        <ToolAreaHeader
          name={"Compressed"}
          actions={
            <div>
              <SizeDisplay source={compressed} />
              <ActionButton onClick={handleDecode}>Decompress</ActionButton>
            </div>
          }
        />

        <EncodersTextArea
          value={compressed}
          onInput={(e) => {
            setCompressed(e.currentTarget.value);
          }}
          style={{ minHeight: "100px" }}
        />
      </div>
    </div>
  );
};

function compress(source: string) {
  return bytesToBase64(pako.gzip(source));
}

function decompress(source: string) {
  return pako.ungzip(base64ToBytes(source), { to: "string" });
}