import { AgentsIcon, InboxIcon, PluginsIcon, SettingsIcon } from "@comba.se/ui/Icons";

import Agents from "./views/Agents";
import Inbox from "./views/Inbox";
import Settings from "./views/Settings";
import Plugins from './views/Plugins';

export default [
  {
    label: "Inbox",
    slug: "inbox",
    component: Inbox,
    isExact: false,
    icon: InboxIcon
  },
  {
    label: "Agents",
    slug: "agents",
    component: Agents,
    isExact: false,
    icon: AgentsIcon
  },
  {
    label: "Plugins",
    slug: "plugins",
    component: Plugins,
    isExact: false,
    icon: PluginsIcon
  },
  {
    label: "Settings",
    slug: "settings",
    component: Settings,
    isExact: false,
    icon: SettingsIcon
  },
];
