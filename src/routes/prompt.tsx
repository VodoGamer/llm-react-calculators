import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/prompt")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Write a React calculator component. Use TypeScript for typing and Tailwind
      CSS for styling. Use the rules of modern design (rounding, small shadows,
      small stroke on some modules). Also the calculator should support light
      and dark theme (using css media properties, dark: in tailwind). UX should
      be on a high level
    </div>
  );
}
