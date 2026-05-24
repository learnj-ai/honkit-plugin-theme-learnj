module.exports = {
    book: {
        assets: "./_assets",
        js: [
            "website/lunr.min.js",
            "website/search-engine.js",
            "website/search.js",
        ],
        css: [
            "website/search.css",
        ],
    },
    hooks: {
        config(config) {
            const themeConfig = config.pluginsConfig["theme-learnj"] || {};
            config.pluginsConfig["theme-learnj"] = themeConfig;
            return config;
        },
    },
};
