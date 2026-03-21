export const CARD_LAYOUTS = [
  { key: "default", label: "Default" },
  { key: "minimal", label: "Minimal" },
  { key: "spotlight", label: "Spotlight" },
  { key: "executive", label: "Executive" },
  { key: "editorial", label: "Editorial" },
  { key: "identity", label: "Identity" },
];

export function resolveCardLayoutKey(card) {
  return card?.profile?.layout_key || "default";
}

export function getTextContactItems(socials = []) {
  const priorities = [
    { ids: [1], label: "Phone" },
    { ids: [3], label: "Email" },
    { ids: [5], label: "Website" },
    { ids: [4], label: "Address" },
  ];

  return priorities
    .map(({ ids, label }) => {
      const match = socials.find((social) => ids.includes(Number(social?.content_id)));

      if (!match?.url) {
        return null;
      }

      return {
        label,
        value: match.url,
      };
    })
    .filter(Boolean);
}
