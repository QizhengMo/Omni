import React, { useState } from "react";
import { ActionButton } from "@src/componenst/ActionButton";
import { ToolAreaHeader } from "@src/componenst/ToolAreaHeader";
import { EncodersTextArea } from "@src/componenst/EncodersTextArea";
import { SizeDisplay } from "@pages/panel/encoders/SizeDisplay";
import { base64ToBytes, bytesToBase64 } from "@pages/panel/encoders/utils";
import { ZstdSimple, ZstdStream } from "@oneidentity/zstd-js";

export const ZstdTab = () => {
  const [source, setSource] = React.useState("");
  const [compressed, setCompressed] = React.useState("");
  const [stream, setStream] = useState(true);

  const handleCompress = async () => {
    const zstdInstance = stream ? ZstdStream : ZstdSimple;
    setCompressed(compress(zstdInstance, source));
  };

  const handleDecode = async () => {
    const zstdInstance = stream ? ZstdStream : ZstdSimple;
    setSource(decompress(zstdInstance, compressed));
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <div className="w-full flex justify-end mb-3">
          <span className="label-text mr-2">Enable Stream</span>
          <input
            type="checkbox"
            checked={stream}
            onChange={(e) => setStream(e.target.checked)}
            className="checkbox"
          />
        </div>
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

type Compressor = {
  compress: (source: Uint8Array) => Uint8Array;
};

type DeCompressor = {
  decompress: (source: Uint8Array) => Uint8Array;
};

function compress(zstd: Compressor, source: string) {
  const compressedArr = zstd.compress(new TextEncoder().encode(source));
  return bytesToBase64(compressedArr);
}

function decompress(zstd: DeCompressor, source: string) {
  const bytes = base64ToBytes(source);
  const decompressed = zstd.decompress(bytes);
  return new TextDecoder().decode(decompressed);
}
