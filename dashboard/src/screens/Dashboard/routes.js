import { AgentsIcon, AnalyticsIcon, InboxIcon, PluginsIcon, SettingsIcon } from 'shared/Icons';

import Agents from "./views/Agents";
import Analytics from "./views/Analytics";
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
    label: "Analytics",
    slug: "analytics",
    component: Analytics,
    isExact: false,
    icon: AnalyticsIcon
  },
  {
    label: "Settings",
    slug: "settings",
    component: Settings,
    isExact: false,
    icon: SettingsIcon
  },
  {
    label: "Plugins",
    slug: "plugins",
    component: Plugins,
    isExact: false,
    icon: PluginsIcon
  }
];
