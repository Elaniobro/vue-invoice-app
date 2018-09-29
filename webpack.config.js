const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
    app: path.resolve(__dirname, 'app'),
    build: path.resolve(__dirname, 'dist')
};

module.exports = {
    entry: {
        app: `${PATHS.app}/app.js`
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min.js'
        }
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }]
    },
    plugins:[
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    watch: true
};
