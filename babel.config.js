module.exports = {
    presets: [
        "next/babel",
    ],
    plugins: [
        [
            "@babel/plugin-transform-typescript",
            {
                allowDeclareFields: true
            }
        ]
    ]
}
