import { Builder } from "@builder.io/react";
import { CodeBlockComponent } from "./CodeBlock";
import { GoToLink } from "./GoToLink";
import dedent from "dedent";
import { useState } from "react";

interface MixBlendModeExplorerProps {
  text?: string;
  fontSize?: string;
  video?: string;
  image?: string;
}

const oceanVideo =
  "https://cdn.builder.io/o/assets%2F63f829e0e7a44824a11461f3037b38ed%2F321eda8b91344a349a2fe52c1400c348%2Fcompressed?apiKey=63f829e0e7a44824a11461f3037b38ed&token=321eda8b91344a349a2fe52c1400c348&alt=media&optimized=true";
const spaceVideo =
  "https://cdn.builder.io/o/assets%2F63f829e0e7a44824a11461f3037b38ed%2Feec9bda8d36c455ab48e875a7701a171%2Fcompressed?apiKey=63f829e0e7a44824a11461f3037b38ed&token=eec9bda8d36c455ab48e875a7701a171&alt=media&optimized=true";
const rainforestVideo =
  "https://cdn.builder.io/o/assets%2F63f829e0e7a44824a11461f3037b38ed%2F6ed2e518224c469c95a709338243fb2a%2Fcompressed?apiKey=63f829e0e7a44824a11461f3037b38ed&token=6ed2e518224c469c95a709338243fb2a&alt=media&optimized=true";

const defaultImage = "";
const defaultFontSize = "150px";
const defaultVideo = oceanVideo;
const defaultText = "Hello world!";

export function MixBlendModeExplorer(props: MixBlendModeExplorerProps) {
  const [expandCodeExample, setExpandCodeExample] = useState(false);

  const video = props.video ?? defaultVideo;
  const text = props.text ?? defaultText;
  const image = props.image ?? defaultImage;
  const fontSize = props.fontSize ?? defaultFontSize;

  return (
    <div css={{ textAlign: "center", padding: 20 }}>
      <h1>Mix Blend Mode Explorer</h1>
      <p>
        This is a React component to visualize border images. We have connected
        it to{" "}
        <GoToLink href="https://www.builder.io/m/developers">
          Builder.io
        </GoToLink>{" "}
        for visual editing. View the source of this component{" "}
        <GoToLink href="https://github.com/BuilderIO/builder-fiddle-demos/blob/main/components/MixBlendModeExplorer.tsx">
          here
        </GoToLink>
      </p>

      <div
        css={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          width="200"
          height="180"
          css={{
            objectFit: "contain",
            position: "absolute",
            bottom: -50,
            left: 48,
            pointerEvents: "none",
            zIndex: 2,
          }}
          src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fdb423d4cf5da494b9b6c49f94b8fa3b4"
        />
        <CodeBlockComponent
          language="css"
          dark
          fontSize={16}
          code={dedent`
          .text {
            background: white;
            color: black;
            mix-blend-mode: lighten;
          }
        `}
        />
      </div>

      <div
        css={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <video
          key={video}
          autoPlay
          muted
          playsInline
          loop
          css={{
            position: "absolute",
            inset: 1,
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
            pointerEvents: "none",
            objectFit: "cover",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div
          css={{
            textAlign: "center",
            padding: 10,
            background: "white",
            mixBlendMode: "lighten",
            fontSize: fontSize,
            fontWeight: 900,
            lineHeight: 0.9,
            alignSelf: "stretch",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

// Add for visual editing in Builder.io
// https://www.builder.io/blog/drag-drop-react
Builder.registerComponent(MixBlendModeExplorer, {
  name: "Mix Blend Mode Explorer",
  inputs: [
    {
      name: "text",
      type: "text",
      defaultValue: defaultText,
    },
    {
      name: "video",
      type: "string",
      enum: [
        {
          label: "Ocean",
          value: oceanVideo,
        },
        {
          label: "Rainforest",
          value: rainforestVideo,
        },
        {
          label: "Space",
          value: spaceVideo,
        },
      ],
      defaultValue: defaultVideo,
    },
    {
      name: "fontSize",
      type: "text",
      defaultValue: defaultFontSize,
    },
    {
      name: "image",
      type: "file",
      allowedFileTypes: ["jpg", "png", "svg"],
      defaultValue: defaultImage,
      helperText: `If you choose an image, it'll display instead of the video`,
    },
  ],
});
