import Agents from "./views/Agents";
import Analytics from "./views/Analytics";
import Inbox from "./views/Inbox";
import Settings from "./views/Settings";

export default [
  {
    slug: "inbox",
    component: Inbox,
    isExact: false
  },
  {
    slug: "agents",
    component: Agents,
    isExact: false
  },
  {
    slug: "analytics",
    component: Analytics,
    isExact: false
  },
  {
    slug: "settings",
    component: Settings,
    isExact: false
  }
];
