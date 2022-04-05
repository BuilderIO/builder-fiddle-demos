import { Builder } from "@builder.io/react";
import { CodeBlockComponent } from "./CodeBlock";
import { GoToLink } from "./GoToLink";
import dedent from "dedent";

interface FlexGapExplorerProps {
  flexGap?: number;
  boxes?: number;
  boxColor?: string;
}

const defaultBoxColor = "#7F76AC";
const defaultBoxNumber = 20;
const defaultGapSize = 20;

export function FlexGapExplorer(props: FlexGapExplorerProps) {
  const range = Array(props.boxes || defaultBoxNumber).fill(0);
  return (
    <div css={{ textAlign: "center" }}>
      <h1>Flex Gap Explorer</h1>
      <p>
        This is a React component to help visualize Flex gaps work. We have
        connected it to{" "}
        <GoToLink href="https://www.builder.io">Builder.io</GoToLink> for visual
        composing and exploring. View the source of this component{" "}
        <GoToLink href="https://github.com/BuilderIO/builder-fiddle-demos/blob/main/components/FlexGapExplorer.tsx">
          here
        </GoToLink>
      </p>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
        }}
        style={{
          gap: props.flexGap || defaultGapSize,
        }}
      >
        {range.map(() => (
          <div
            css={{
              height: 100,
              width: 100,
              background: props.boxColor || defaultBoxColor,
            }}
          />
        ))}
      </div>
      <CodeBlockComponent
        language="css"
        dark
        code={dedent`
        .container {
          display: flex;
          flex-wrap: wrap;
          flex-gap: ${props.flexGap || defaultGapSize};
        }
        `}
      />
    </div>
  );
}

// Add for visual editing in Builder.io
// https://www.builder.io/blog/drag-drop-react
Builder.registerComponent(FlexGapExplorer, {
  name: "Flex Gap Explorer",
  inputs: [
    {
      name: "flexGap",
      type: "number",
      defaultValue: defaultGapSize,
      helperText: 'Edit this to change the "flex-gap" value',
    },
    {
      name: "boxes",
      type: "number",
      defaultValue: defaultBoxNumber,
      helperText: "Number of boxes to render",
    },
    {
      name: "boxColor",
      type: "color",
      defaultValue: defaultBoxColor,
      helperText: "Color of the boxes",
    },
  ],
});