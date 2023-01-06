import { resolve as _resolve, dirname } from 'path';

export const entry = './src/index.ts';
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
  ]
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js']
};
export const output = {
  filename: 'bundle.js',
  path: _resolve(dirname('.'), 'dist')
};
export const target = 'node';
