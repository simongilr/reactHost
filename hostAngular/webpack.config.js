const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const isCapBuild = process.env.CAP_BUILD;

const remotes =
  isCapBuild == null
    ? // Configuration for when developing locally
      {
        about: 'about@http://localhost:8081/remoteEntry.js',
        list: 'list@http://localhost:8082/remoteEntry.js',
      }
    : // Configuration for when building for capacitor
      {
        about: `about@about/remoteEntry.js`,
        list: `list@list/remoteEntry.js`,
      };

module.exports = {
  entry: './src/app/app.component.ts', // Cambia la entrada a un archivo TypeScript en lugar de un archivo HTML
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // Crea nodos de estilo a partir de cadenas JS
          'css-loader', // Transpila CSS a CommonJS
          'sass-loader', // Compila Sass a CSS
        ],
      },
      {
        test: /\.html$/, // Agrega una regla para archivos HTML
        loader: 'html-loader', // Usa html-loader para manejar archivos HTML
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell', // Nombre de tu aplicación Angular
      remotes,
      filename: 'remoteEntry.js',
      exposes: {
        './AppComponent': './src/app/app.component.ts', // Exponer el componente principal de Angular
        // Agrega más exposiciones según sea necesario para otros componentes o módulos
      },
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
