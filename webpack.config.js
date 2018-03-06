const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode:'development',
  devServer:  {   // no production
    contentBase:'./public'      // no production
//    ,https:
  },                           // no production
  // devtool: 'inline-source-map',  // no production
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  externals: { // Use external version of React
    "react": "React",
    "react-dom": "ReactDOM"
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                'react',
                ["env", {
                  "targets": {
                    "browsers": ["last 2 versions"]
                  }
                }],
//                "stage-2"               
            ],
            plugins: ["transform-object-rest-spread"]            
          }
        }
      }
    ]
  }, 
  plugins: [
//    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
//      inject:'head',
      filename: 'index.html'
    }),
//     new ScriptExtHtmlWebpackPlugin({
// //      defaultAttribute: 'defer',
//       custom: {
//         test: /\.bundle\.js$/,
//         attribute: 'type',
//         value: 'module'
//       },      
//     })
  ]  
};