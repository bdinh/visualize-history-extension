var path = require("path");
var config = {
    entry: ["./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules:[
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                use: "source-map-loader",
                exclude: /node_modules/
            },{
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ],
    }
};
module.exports = config;