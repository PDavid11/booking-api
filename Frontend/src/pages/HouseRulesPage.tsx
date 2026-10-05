import HouseRulesData from "../constants/HouseRulesData.json";
import { FadeIn } from "../components/FadeIn";

function RuleGroup({ title, rules }: { title?: string; rules: string[] }) {
  const mid = Math.ceil(rules.length / 2);
  const groups = [rules.slice(0, mid), rules.slice(mid)];

  return (
    <div>
      {title ? <h2 className="mt-12 text-2xl font-semibold tracking-tight">{title}</h2> : null}
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {groups.map((group, gi) => (
          <ol key={gi} className="flex flex-col gap-4" start={gi === 0 ? 1 : mid + 1}>
            {group.map((rule, index) => (
              <li key={index} className="max-w-[60ch] text-sm leading-relaxed text-ink">
                {rule}
              </li>
            ))}
          </ol>
        ))}
      </div>
    </div>
  );
}

export function HouseRulesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <FadeIn>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{HouseRulesData.title}</h1>
        <RuleGroup rules={HouseRulesData.generalRules} />
        <RuleGroup title={HouseRulesData.cleaningSection.title} rules={HouseRulesData.cleaningSection.rules} />
        <p className="mt-12 text-sm font-medium text-muted">{HouseRulesData.author}</p>
      </FadeIn>
    </div>
  );
}
