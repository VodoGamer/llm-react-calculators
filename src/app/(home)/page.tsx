import Link from "next/link";

interface Model {
  name: string;
  href: string;
}

interface ModelGroup {
  name: string;
  models: Model[];
}

const modelGroups: ModelGroup[] = [
  {
    name: "OpenAI",
    models: [
      { name: "O3 Mini High", href: "/openai/o3-mini-high" },
      { name: "GPT 4o", href: "/openai/gpt-4o" },
      { name: "GPT 4.1", href: "/openai/gpt-41" },
      { name: "GPT 4.1 Mini", href: "/openai/gpt-41-mini" },
      { name: "GPT 4.1 Nano", href: "/openai/gpt-41-nano" },
    ],
  },
  {
    name: "Google",
    models: [
      { name: "Gemini 2.0 Flash", href: "/google/gemini-20-flash" },
      { name: "Gemini 2.0 Flash Lite", href: "/google/gemini-20-flash-lite" },
      { name: "Gemini 2.5 Pro", href: "/google/gemini-25-pro" },
    ],
  },
  {
    name: "Anthropic",
    models: [
      { name: "Claude 3.7 Sonnet", href: "/anthropic/37-sonnet" },
      {
        name: "Claude 3.7 Sonnet Reasoning",
        href: "/anthropic/37-sonnet-reasoning",
      },
      { name: "Claude 3.5 Sonnet", href: "/anthropic/35-sonnet" },
    ],
  },
  {
    name: "xAI",
    models: [
      { name: "Grok 3 Mini (High)", href: "/xai/grok-3-mini" },
      { name: "Grok 3", href: "/xai/grok-3" },
    ],
  },
  {
    name: "DeepSeek",
    models: [
      { name: "DeepSeek V3 0324", href: "/deepseek/deepseek-v3-0324" },
      { name: "DeepSeek R1", href: "/deepseek/deepseek-r1" },
      {
        name: "DeepSeek R1 Llama Distilled",
        href: "/deepseek/deepseek-r1-llama",
      },
    ],
  },
  {
    name: "Meta",
    models: [
      { name: "Llama 4 Scout", href: "/meta/llama-scout" },
      { name: "Llama 4 Maverick", href: "/meta/llama-maverick" },
      { name: "Llama 3.7 70B", href: "/meta/llama-37-70b" },
    ],
  },
  {
    name: "Unknown (Mystery models)",
    models: [
      { name: "Quasar Alpha", href: "/unknown/quasar-alpha" },
      { name: "Optimus Alpha", href: "/unknown/optimus-alpha" },
    ],
  },
];

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
        {modelGroups.map((group) => (
          <li key={group.name}>
            <h3 className="text-sm text-gray-500">{group.name}</h3>
            <ul className="flex flex-col">
              {group.models.map((model) => (
                <li key={model.href}>
                  <Link className="text-blue-500" href={model.href}>
                    {model.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
