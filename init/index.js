import { prompt, confirm } from 'node-ask';
import writeJsonFile from 'write-json-file';
import chalk from 'chalk';
import fs from 'fs-extra';

(async () => {
    try {
        const name = await prompt(
            chalk.green.bold(
                'What is the name of your organization? (e.g. Comba) '
            )
        );

        const url = await prompt(
            chalk.green.bold(
                `What is the absolute URL for your organization? (e.g. https://comba.io) `
            )
        );

        const favicon = await prompt(
            chalk.green.bold(
                `What is the absolute URL to your organization favicon.ico file? (e.g. https://comba.io/favicon.ico) `
            )
        );

        const image = await prompt(
            chalk.green.bold(
                `What is the absolute URL to your organization logo? (a PNG sized to 512x512px is required) `
            )
        );

        const theme = await prompt(
            chalk.green.bold(
                `What is the theme color for your organization? (e.g. #4D7CFE) `
            )
        );

        const background = await prompt(
            chalk.green.bold(
                `What background color would you like to default to? (e.g. #ffffff) `
            )
        );

        await writeJsonFile('manifest.json', {
            name: name,
            short_name: name,
            url,
            icons: [
                {
                    src: favicon,
                    sizes: '16x16',
                    type: 'image/x-icon',
                },
                {
                    src: image,
                    type: 'image/png',
                    sizes: '512x512',
                },
            ],
            start_url: '.',
            display: 'standalone',
            theme_color: theme,
            background_color: background,
        });

        await fs.copySync('manifest.json', './dashboard/public/manifest.json');

        console.log(`Configuration has been saved for ${name}.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
