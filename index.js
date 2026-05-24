module.exports = {
    hooks: {
        config(config) {
            const themeConfig = config.pluginsConfig["theme-learnj"] || {};
            config.pluginsConfig["theme-learnj"] = themeConfig;
            return config;
        },
    },
};
