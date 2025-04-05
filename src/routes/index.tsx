import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto flex h-screen w-max max-w-screen-md flex-col items-center justify-center gap-2">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          Catalog of LLM generated calculators
        </h1>
        <p className="text-sm text-gray-500">
          All calculators are one shotted by popular models.{" "}
          <Link className="text-xs text-blue-500" to="/prompt">
            Prompt
          </Link>
        </p>
      </div>
      <ul className="flex w-full flex-col gap-2">
        <div>
          <span className="text-sm text-gray-500">OpenAI</span>
          <li>
            <Link className="text-blue-500" to="/o3-mini-high">
              O3 Mini High
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/gpt-4o">
              GPT 4o
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Google</span>
          <li>
            <Link className="text-blue-500" to="/gemini-20-flash">
              Gemini 2.0 Flash
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/gemini-20-flash-lite">
              Gemini 2.0 Flash Lite
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/gemini-25-pro">
              Gemini 2.5 Pro
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Anthropic</span>
          <li>
            <Link className="text-blue-500" to="/37-sonnet">
              Claude 3.7 Sonnet
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/37-sonnet-reasoning">
              Claude 3.7 Sonnet Reasoning
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/35-sonnet">
              Claude 3.5 Sonnet
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">DeepSeek</span>
          <li>
            <Link className="text-blue-500" to="/deepseek-v3-0324">
              DeepSeek V3 0324
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/deepseek-r1">
              DeepSeek R1
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/deepseek-r1-llama">
              DeepSeek R1 Llama Distilled
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Meta</span>
          <li>
            <Link className="text-blue-500" to="/llama-scout">
              Llama 4 Scout
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/llama-maverick">
              Llama 4 Maverick
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" to="/llama-37-70b">
              Llama 3.7 70B
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">
            Unknown {"(Mystery models)"}
          </span>
          <li>
            <Link className="text-blue-500" to="/quasar-alpha">
              Quasar Alpha
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
