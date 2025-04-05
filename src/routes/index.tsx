import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto flex h-screen max-w-screen-md flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold">
        Catalog of LLM generated calculators
      </h1>
      <p className="text-sm text-gray-500">
        All calculators are one shotted by popular models.{" "}
        <Link className="text-xs text-blue-500" to="/prompt">
          Prompt
        </Link>
      </p>
      <ul className="flex flex-col items-center justify-center">
        <li>
          <Link className="text-blue-500" to="/gemini-20-flash">
            Gemini 2.0 Flash
          </Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/o3-mini-high">
            O3 Mini High
          </Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/quasar-alpha">
            Quasar Alpha
          </Link>
        </li>
      </ul>
    </div>
  );
}
