import Agents from "./views/Agents";
import Analytics from "./views/Analytics";
import Inbox from "./views/Inbox";
import Settings from "./views/Settings";

export default [
  {
    label: "Inbox",
    slug: "inbox",
    component: Inbox,
    isExact: false
  },
  {
    label: "Agents",
    slug: "agents",
    component: Agents,
    isExact: false
  },
  {
    label: "Analytics",
    slug: "analytics",
    component: Analytics,
    isExact: false
  },
  {
    label: "Settings",
    slug: "settings",
    component: Settings,
    isExact: false
  }
];
