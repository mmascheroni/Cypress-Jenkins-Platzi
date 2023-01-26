const { defineConfig } = require('cypress');
const {
    addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');
const webpack = require('@cypress/webpack-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

// Guarda diferentes keys
const values = {};

async function setupNodeEvents(on, config) {
    // implement node event listeners here
    addMatchImageSnapshotPlugin(on, config);
    // Plugin For Share informations in different pages
    on('task', {
        save(value) {
            const key = Object.keys(value)[0];

            values[key] = value[key];
            return null;
        },
        get(key) {
            console.log('values', values);
            return values[key] ?? 'There is not value';
        },
    });

    await preprocessor.addCucumberPreprocessorPlugin(on, config);

    const options = {
        webpackOptions: {
            module: {
                rules: [
                    {
                        test: /\.feature$/,
                        use: [
                            {
                                loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                                options: config,
                            },
                        ],
                    },
                ],
            },
        },
    };

    on('file:preprocessor', webpack(options));

    allureWriter(on, config);

    return config;
}

module.exports = defineConfig({
    // reporter: 'cypress-multi-reporters',
    // reporterOptions: {
    //     configFile: 'reporter-config.json',
    // },
    projectId: 'a3de4r',
    e2e: {
        baseUrl: 'https://pokedexpokemon.netlify.app',
        experimentalSessionAndOrigin: true,
        setupNodeEvents,
        specPattern: '**/*.feature',

        // retries: 2, // Retry many times each test when failed

        // env: {
        //     credentials: {
        //         user: 'username',
        //         password: 'password',
        //     },
        // },
    },
});
