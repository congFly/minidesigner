var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
module.exports = {
    //entry: "./index.js",
    devtool: 'eval-source-map',
    // output: {
    //     path: __dirname,
    //     filename: "./deploy/bundle.js"
    // },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            /*{
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'assets/[name]-[hash:5].[ext]',
                        limit: 4000
                    }
                }, 'image-webpack-loader'
                ]
            },*/
            {test: /\.(jpg|png|gif|svg)$/, loader: "url-loader?limit=8192&name=images/[hash:8].[name].[]"}
        ]
    },
    entry: {
        jquery: ['jquery'],
        lodash: ['lodash'],
        jstree: ['jstree'],
        index: ["./source/page/index"],
        designer: './source/cmd/designer'
    },
    output: {
        filename: "./deploy/[name].js"
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "./commons",
            chunks: ["index", 'designer']
        }),
        new ExtractTextPlugin("styles.min.css"),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 8000
    }
};