import HouseRulesData from "../constants/HouseRulesData.json";

export function HouseRulesPage() {
  return (
    <div>
      <h1>{HouseRulesData.title}</h1>

      <ul>
        {HouseRulesData.generalRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>

      <h2>{HouseRulesData.cleaningSection.title}</h2>
      <ul>
        {HouseRulesData.cleaningSection.rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>

      <p>{HouseRulesData.author}</p>
    </div>
  );
}