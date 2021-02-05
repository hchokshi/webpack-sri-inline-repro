const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");

module.exports = (env) => ({
    entry: {
        app: path.resolve(__dirname, "index"),
    },
    output: {
        path: path.resolve(__dirname, "dist", env?.noInline ? "noInline" : "inline"),
        crossOriginLoading: "anonymous",
    },
    optimization: {
        runtimeChunk: {
            // Put webpack runtime code in a single separate chunk called "runtime.js"
            name: "runtime",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: env?.noInline
                ? undefined
                : {
                      // Inline "runtime.js" as a <script> tag in the HTML
                      chunks: "initial",
                      test: "runtime",
                  },
        }),
        new SubresourceIntegrityPlugin(),
    ],
});
