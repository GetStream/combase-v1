import { PasswordIcon } from 'shared/Icons';

export default {
    blaze_verify: {
        avatar: 'https://logo.clearbit.com/blazeverify.com',
        available: true,
        description:
            'Email address verification that improves quality and deliverability.',
        title: 'Blaze Verify',
        slug: 'blaze_verify',
        url: 'https://blazeverify.com/',
        type: 'Enrichment',
        steps: [
            {
                text: 'Go to Blaze Verify and create an account.',
            },
            {
                text: 'Create a Public API Key for client-side use.',
            },
            {
                text: 'Paste your API Key into the field below and hit save.',
            },
        ],
        inputs: [
            {
                icon: PasswordIcon,
                placeholder: 'API Key',
                name: 'api_key',
                type: 'password',
            },
        ],
    },
    clearbit: {
        avatar: 'https://logo.clearbit.com/clearbit.com',
        available: false,
        description: 'Provide enriched data on the user you are talking with.',
        title: 'Clearbit',
        slug: 'clearbit',
        url: 'https://clearbit.com',
        type: 'Enrichment',
        steps: [],
        inputs: [],
    },
    hubspot: {
        avatar:
            'https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_approved-sprocket-2.svg',
        available: false,
        description:
            'HubSpot is a developer and marketer of software products for inbound marketing and sales',
        title: 'HubSpot',
        slug: 'hubspot',
        url: 'https://hubspot.com',
        type: 'CRM',
        steps: [],
        inputs: [],
    },
    zapier: {
        avatar: 'https://logo.clearbit.com/zapier.com',
        description:
            'Connect the apps you use everyday to automate your work and be more productive.',
        available: false,
        title: 'Zapier',
        slug: 'zapier',
        url: 'https://zapier.com',
        type: 'I/O',
        steps: [],
        inputs: [],
    },
    google_analytics: {
        avatar: 'https://logo.clearbit.com/gaiq-center.com',
        description:
            'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.',
        available: false,
        title: 'Google Analytics',
        slug: 'google_analytics',
        url: 'https://analytics.google.com',
        type: 'Analytics',
        steps: [],
        inputs: [],
    },
    slack: {
        avatar: 'https://logo.clearbit.com/slack.com',
        description: 'Convert your hottest leads right from Slack.',
        available: false,
        title: 'Slack',
        slug: 'slack',
        url: 'https://slack.com',
        type: 'CRM',
        steps: [],
        inputs: [],
    },
    mailchimp: {
        avatar: 'https://logo.clearbit.com/mailchimp.com',
        description:
            'Mailchimp is an American marketing automation platform and an email marketing service.',
        available: false,
        title: 'Mailchimp',
        slug: 'mailchimp',
        url: 'https://mailchimp.com',
        type: 'CRM',
        steps: [],
        inputs: [],
    },
    stripe: {
        avatar: 'https://logo.clearbit.com/stripe.dev',
        description:
            'Stripe allows individuals and businesses to make and receive payments over the Internet.',
        available: false,
        title: 'Stripe',
        slug: 'stripe',
        url: 'https://stripe.com',
        type: 'Payments',
        steps: [],
        inputs: [],
    },
};
