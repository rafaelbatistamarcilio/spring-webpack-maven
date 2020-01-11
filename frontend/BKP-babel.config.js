module.exports = {
    presets: [
        [
            "@babel/env",
            {
                useBuiltIns: "usage",
                debug: true,
                targets: {
                   ie:'11',
                },
                modules:false
            },
        ],
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', { "corejs": 3 }]
    ]
};