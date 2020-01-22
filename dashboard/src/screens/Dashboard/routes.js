import Agents from "./views/Agents";
import Analytics from "./views/Analytics";
import Chat from "./views/Chat";
import Settings from "./views/Settings";

export default [
  {
    slug: "chat",
    component: Chat,
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
