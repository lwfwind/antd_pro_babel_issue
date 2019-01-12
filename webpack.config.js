const path = require('path');
const mode = process.env.NODE_NEV || "development";
const webpack = require('webpack');
module.exports = {
  mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: 'http://localhost:8001/dist/'
  },
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [{
        test: /\.(js|jsx)/,
        use: {
            loader: 'babel-loader'
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader!less-loader?javascriptEnabled=true'
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, './node_modules'),
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]__[local]___[hash:base64:5]",
          }
        }, {
          loader: "less-loader", // compiles Less to CSS
          options:
            {modifyVars: {
              'primary-color': '#F57400',
              'border-radius-base': '2px',
         },
            javascriptEnabled: true
          }
        }]
      }
    ]
  },

  devServer: {
    proxy: {
      '/hermes': 'http://localhost:13235/'
    }
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.

}
