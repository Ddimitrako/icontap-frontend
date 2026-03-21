export const CARD_LAYOUTS = [
  { key: "default", label: "Default" },
  { key: "minimal", label: "Minimal" },
  { key: "spotlight", label: "Spotlight" },
  { key: "executive", label: "Executive" },
  { key: "editorial", label: "Editorial" },
  { key: "identity", label: "Identity" },
  { key: "contact-card", label: "Contact Card" },
  { key: "city-profile", label: "City Profile" },
];

export function resolveCardLayoutKey(card) {
  return card?.profile?.layout_key || "default";
}

export function getTextContactItems(socials = []) {
  if (!Array.isArray(socials)) {
    return [];
  }

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

export function getPrimaryContactItems(socials = [], limit = null) {
  if (!Array.isArray(socials)) {
    return [];
  }

  const priorities = [1, 3, 4, 5];

  const items = socials
    .filter((social) => priorities.includes(Number(social?.content_id)) && social?.url)
    .sort((a, b) => priorities.indexOf(Number(a?.content_id)) - priorities.indexOf(Number(b?.content_id)));

  return typeof limit === "number" ? items.slice(0, limit) : items;
}
