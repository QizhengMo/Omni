import React from "react";
// @ts-ignore
import { Zstd } from "@hpcc-js/wasm/zstd";
import { useRequest } from "ahooks";
import { ActionButton } from "@src/componenst/ActionButton";
import { ToolAreaHeader } from "@src/componenst/ToolAreaHeader";
import { EncodersTextArea } from "@src/componenst/EncodersTextArea";
import { SizeDisplay } from "@pages/panel/encoders/SizeDisplay";
import { base64ToBytes, bytesToBase64 } from "@pages/panel/encoders/utils";

export const ZstdTab = () => {
  const [source, setSource] = React.useState("");
  const [compressed, setCompressed] = React.useState("");
  const { data: zstdInstance, loading } = useRequest(() => {
    return Zstd.load();
  });

  const handleCompress = () => {
    setCompressed(compress(zstdInstance, source));
  };

  const handleDecode = () => {
    setSource(decompress(zstdInstance, compressed));
  };

  return loading ? (
    <>
      <h2>Loading ZSTD instance...</h2>
    </>
  ) : (
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

function compress(zstd: Zstd, source: string) {
  const compressedArr = zstd.compress(new TextEncoder().encode(source));
  return bytesToBase64(compressedArr);
}

function decompress(zstd: Zstd, source: string) {
  const bytes = base64ToBytes(source);
  const decompressed = zstd.decompress(bytes);
  return new TextDecoder().decode(decompressed);
}