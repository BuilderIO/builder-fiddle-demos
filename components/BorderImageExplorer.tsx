import { Builder } from "@builder.io/react";
import { CodeBlockComponent } from "./CodeBlock";
import { GoToLink } from "./GoToLink";
import dedent from "dedent";

interface BorderImageExplorerProps {
  borderImageWidth?: number;
  borderImageOutset?: number;
  borderImageSlice?: string;
  borderImageRepeat?: string;
  image?: string;
}

const defaultImage =
  "https://cdn.builder.io/api/v1/image/assets%2F63f829e0e7a44824a11461f3037b38ed%2F5f6b0952ca554ddaaba4d131f91327e4?quality=60&width=800";
const defaultborderImageWidth = 20;
const defaultBorderImageSlice = "30";
const defaultBorderImageRepeat = "stretch";
const defaultBorderImageOutset = 0;

export function BorderImageExplorer(props: BorderImageExplorerProps) {
  return (
    <div css={{ textAlign: "center", padding: 20 }}>
      <h1>Border Image Explorer</h1>
      <p>
        This is a React component to visualize border images. We have connected
        it to{" "}
        <GoToLink href="https://www.builder.io/m/developers">
          Builder.io
        </GoToLink>{" "}
        for visual editing. View the source of this component{" "}
        <GoToLink href="https://github.com/BuilderIO/builder-fiddle-demos/blob/main/components/BorderImageExplorer.tsx">
          here
        </GoToLink>
      </p>

      <CodeBlockComponent
        language="css"
        dark
        code={dedent`
        .box {
          border-style: solid;
          border-image-width: ${
            props.borderImageWidth ?? defaultborderImageWidth
          }px;
          border-image-source: url('${props.image ?? defaultImage}');
          border-image-slice: ${
            props.borderImageSlice ?? defaultBorderImageSlice
          };
          border-image-repeat: ${
            props.borderImageRepeat ?? defaultBorderImageRepeat
          };
        }
        `}
      />

      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 30,
          justifyContent: "center",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 200,
            height: 200,
            borderStyle: "solid",
            borderImageSource: `url("${props.image ?? defaultImage}")`,
            borderWidth: `${
              props.borderImageWidth ?? defaultborderImageWidth
            }px`,
            borderImageSlice: props.borderImageSlice ?? defaultBorderImageSlice,
            borderImageRepeat:
              props.borderImageRepeat ?? defaultBorderImageRepeat,
            borderImageOutset: `${
              props.borderImageOutset ?? defaultBorderImageOutset
            }px`,
          }}
        >
          Hello world!
        </div>
      </div>
    </div>
  );
}

// Add for visual editing in Builder.io
// https://www.builder.io/blog/drag-drop-react
Builder.registerComponent(BorderImageExplorer, {
  name: "Border Image Explorer",
  inputs: [
    {
      name: "image",
      type: "file",
      allowedFileTypes: ["jpg", "png", "svg"],
      defaultValue: defaultImage,
    },
    {
      name: "borderImageWidth",
      type: "number",
      defaultValue: defaultborderImageWidth,
    },
    {
      name: "borderImageSlice",
      type: "string",
      defaultValue: defaultBorderImageSlice,
      helperText:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice",
    },
    {
      name: "borderImageRepeat",
      type: "string",
      enum: ["stretch", "repeat", "round", "space"],
      defaultValue: defaultBorderImageRepeat,
      helperText:
        "https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat",
    },
    // {
    //   name: "borderImageOutset",
    //   type: "number",
    //   defaultValue: defaultBorderImageOutset,
    //   helperText:
    //     "https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset",
    // },
  ],
});
