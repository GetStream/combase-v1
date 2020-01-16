# Comba

[Comba](https://github.com/getstream/comba) is an open-source and white-label customer support dashboard and widget that is powered by [Stream](https://getstream.io/). This is a plugin for Comba that adds support for people enrichment via [Clearbit](https://clearbit.com).

## Installation

To install Comba, user npm or yarn (yarn is the preferred method for installation). Then create an account with Clearbit and copy your API Key. Once you have obtained your Clearbit API Key, add the plugin to the array in `plugins.json` as well as the API Key as an environment variable.

1. Install

```bash
yarn add @comba/plugin-clearbit
```

2. Create an account with Clearbit

![Clearbit](https://i.imgur.com/V3F6FE0.png)

3. Add your Clearbit API Key to your environment

```bash
echo 'CLEARBIT_API_KEY=YOUR_CLEARBIT_API_KEY' >> plugins.json
```

> **Note**: _For any issues or questions regarding this plugin, please provide feedback in the [issues](https://github.com/getstream/comba/issues) section and tag your issue with the plugin name._
