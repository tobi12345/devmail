const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const getEnvs = require("./getEnvs")
const webpack = require("webpack")

module.exports = (envs) => {
	return {
		entry: path.resolve(__dirname, "..", "dist", `ui-${envs.project}`, "index.js"),
		output: {
			path: path.resolve(__dirname, "..", `dist_ui_${envs.project}`),
			filename: "[name].[contenthash:8].js",
			chunkFilename: "[id].[contenthash:8].js",
			publicPath: "/",
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: ["file-loader"],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "..", "src", `ui-${envs.project}`, "public", "index.html"),
				filename: "index.html",
				inject: "body",
			}),
			new webpack.DefinePlugin(getEnvs(path.resolve(__dirname, "..", `${envs.project}.env`))),
			new FaviconsWebpackPlugin(path.resolve(__dirname, "..", "assets", "email.png")),
		],
	}
}
