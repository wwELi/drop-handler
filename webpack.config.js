const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

class GenReadMePlugin {
    apply(complier) {
        complier.hooks.done.tap('gen read me', (stats) => {
            const fs = require('fs');
            fs.writeFileSync('./lib/README.md', `# drop-handler 链式的处理使用鼠标拖拽事件
            new Drop().start(([x, y]) => {
                    // dosomething
                })
                .move(() => {})
                .end(() => {})
            `)
        })
    }
}

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
        }),
        new GenReadMePlugin()
    ]
}