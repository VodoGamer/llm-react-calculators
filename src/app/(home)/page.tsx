import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-md flex-col items-center justify-center gap-2 p-4">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          Catalog of LLM generated calculators
        </h1>
        <p className="text-sm text-gray-500">
          All calculators are one shotted by popular models. All components must
          support both light and dark themes. Component code is inserted without
          any changes.{" "}
          <Link className="text-xs text-blue-500" href="/prompt">
            Prompt
          </Link>
        </p>
      </div>
      <ul className="flex w-full flex-col gap-2">
        <div>
          <span className="text-sm text-gray-500">OpenAI</span>
          <li>
            <Link className="text-blue-500" href="/openai/o3-mini-high">
              O3 Mini High
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/openai/gpt-4o">
              GPT 4o
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Google</span>
          <li>
            <Link className="text-blue-500" href="/google/gemini-20-flash">
              Gemini 2.0 Flash
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/google/gemini-20-flash-lite">
              Gemini 2.0 Flash Lite
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/google/gemini-25-pro">
              Gemini 2.5 Pro
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Anthropic</span>
          <li>
            <Link className="text-blue-500" href="/anthropic/37-sonnet">
              Claude 3.7 Sonnet
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-500"
              href="/anthropic/37-sonnet-reasoning"
            >
              Claude 3.7 Sonnet Reasoning
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/anthropic/35-sonnet">
              Claude 3.5 Sonnet
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">DeepSeek</span>
          <li>
            <Link className="text-blue-500" href="/deepseek/deepseek-v3-0324">
              DeepSeek V3 0324
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/deepseek/deepseek-r1">
              DeepSeek R1
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/deepseek/deepseek-r1-llama">
              DeepSeek R1 Llama Distilled
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">Meta</span>
          <li>
            <Link className="text-blue-500" href="/meta/llama-scout">
              Llama 4 Scout
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/meta/llama-maverick">
              Llama 4 Maverick
            </Link>
          </li>
          <li>
            <Link className="text-blue-500" href="/meta/llama-37-70b">
              Llama 3.7 70B
            </Link>
          </li>
        </div>

        <div>
          <span className="text-sm text-gray-500">
            Unknown {"(Mystery models)"}
          </span>
          <li>
            <Link className="text-blue-500" href="/unknown/quasar-alpha">
              Quasar Alpha
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}
