import colors from "../constants/colors";

/**
 * Link component that will open in a new tab even when clickin in Builder's visual editor
 */
export function GoToLink(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  return (
    <a
      onClick={(e) => {
        if (!(e.metaKey || e.shiftKey || e.altKey || e.ctrlKey)) {
          open(props.href, "_blank", "noopener");
        }
      }}
      rel="noopener"
      target="_blank"
      css={{
        color: colors.primary,
      }}
      {...props}
    >
      {props.children}
    </a>
  );
}
