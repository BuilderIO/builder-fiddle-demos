import { Builder } from "@builder.io/react";
import { GoToLink } from "./GoToLink";

const array = Array(10).fill(0);

interface FlexGapExplorerProps {
  flexGap?: number;
  boxes?: number;
  boxColor?: string;
}

export function FlexGapExplorer(props: FlexGapExplorerProps) {
  const range = Array(props.boxes || 20).fill(0);
  return (
    <div>
      <h1>Flex Gap Explorer</h1>
      <p>
        This is a component to help visualize Flex gaps work. We have connected
        it to <GoToLink href="https://www.builder.io">Builder.io</GoToLink> for
        visual composing and exploring. View the source of this component <GoToLink href="https://www.builder.io">here</GoToLink>
      </p>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          flexGap: props.flexGap || 20,
        }}
      >
        {range.map(() => (
          <div
            css={{
              height: 100,
              width: 100,
              background: props.boxColor || "red",
            }}
          />
        ))}
      </div>
    </div>
  );
}

Builder.registerComponent(FlexGapExplorer, {
  name: "Flex Gap Explorer",
  inputs: [
    {
      name: "flexGap",
      type: "number",
      defaultValue: 20,
      helperText: 'Edit this to change the "flex-gap" value',
    },
    {
      name: "boxes",
      type: "number",
      defaultValue: 10,
      helperText: "Number of boxes to render",
    },
    {
      name: "boxColor",
      type: "color",
      defaultValue: "red",
      helperText: "Color of the boxes",
    },
  ],
});
