import Assignment from "@mui/icons-material/Assignment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import javascript from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import html from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light-async";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import githubGist from "react-syntax-highlighter/dist/cjs/styles/hljs/github-gist";
import { copyToClipboard } from "../functions/copy-to-clipboard";

SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("xml", html);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("jsx", javascript);

// Adapted from https://github.com/dpeek/highlightjs-graphql/blob/master/graphql.js#L10
SyntaxHighlighter.registerLanguage("graphql", (hljs: any) => ({
  aliases: ["gql"],
  keywords: {
    keyword:
      "query mutation subscription|10 type interface union scalar fragment|10 enum on ...",
    literal: "true false null",
  },
  contains: [
    hljs.HASH_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.NUMBER_MODE,
    {
      className: "type",
      begin: "[^\\w][A-Z][a-z]",
      end: "\\W",
      excludeEnd: true,
    },
    {
      className: "literal",
      begin: "[^\\w][A-Z][A-Z]",
      end: "\\W",
      excludeEnd: true,
    },
    { className: "variable", begin: "\\$", end: "\\W", excludeEnd: true },
    {
      className: "keyword",
      begin: "[.]{2}",
      end: "\\.",
    },
    {
      className: "meta",
      begin: "@",
      end: "\\W",
      excludeEnd: true,
    },
  ],
  illegal: /([;<']|BEGIN)/,
}));

const defaultCopyButtonTooltipText = "Copy code to clipboard";

export function CodeBlockComponent(
  { language, code, dark, fontSize }: any /* TODO: types */
) {
  const [copyButtonTooltipText, setCopyButtonTooltipText] = useState(
    defaultCopyButtonTooltipText
  );

  return (
    <div
      css={{
        position: "relative",
        textAlign: "left",
        "&:hover .copy-to-clipboard": {
          display: "block !important",
        },
        "& code": {
          fontSize: fontSize ?? 14,
        },
      }}
    >
      <Tooltip title={copyButtonTooltipText}>
        <IconButton
          css={{
            position: "absolute !important" as any,
            top: 0,
            right: 0,
            display: "none !important" as any,
            zIndex: 10,
          }}
          className="copy-to-clipboard"
          onMouseLeave={() => {
            setCopyButtonTooltipText(defaultCopyButtonTooltipText);
          }}
          onClick={() => {
            copyToClipboard(code);
            setCopyButtonTooltipText("Copied!");
          }}
        >
          <Assignment
            css={{
              color: dark ? "white" : "black",
              opacity: 0.7,
            }}
          />
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter
        customStyle={{
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          lineHeight: "1em",
          fontSize: "1.2em",
          padding: 20,
          borderRadius: 5,
        }}
        style={dark ? oneDark : githubGist}
        language={language}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
