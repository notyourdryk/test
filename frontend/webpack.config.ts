import path from 'path';
import { fileURLToPath } from 'url';
import { type Configuration } from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env: Record<string, string | boolean>, argv: Record<string, string | boolean>): Configuration => {
    const mode: 'development' | 'production' = argv.mode === 'development'
        ? 'development'
        : 'production';
    if (mode === 'development') console.log('Running in DEVELOPMENT mode');

    const config: Configuration = {
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        },
        entry: {
            core: path.join(__dirname, `./src/index.tsx`),
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].[contenthash].js',
            publicPath: '/',
        },
        plugins: [
            new ESLintWebpackPlugin({
                context: path.join(__dirname, './src'),
                extensions: ['ts', 'tsx'],
                failOnError: false,
            }),
            new HTMLWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
            })

        ],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ['ts-loader']
                },
                {
                    test: /\.(le|c|sc)ss$/,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader', 'less-loader'],
                }
            ],
        },
        devServer: {
            port: 3001,
            host: '0.0.0.0',
            hot: true,
            historyApiFallback: true,
            proxy: [{
                path: '/api',
                target: {
                    host: '0.0.0.0',
                    port: 3000,
                    protocol: 'http'
                },
                pathRewrite: {
                    '^/api': ''
                }
            }]
        },
        ...(
            mode === 'production'
                ? {
                    devtool: false,
                    optimization: {
                        minimize: true,
                    }
                }
                : {}
        ),
    };

    return config;
}
