const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        library: 'drop-handler',
        libraryTarget: 'umd',
        globalObject: 'window',
        path: path.join(__dirname, 'lib')
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: 'ts-loader',
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'package.json'), to: path.join(__dirname, 'lib/package.json')
                }
            ]
        })
    ]
}