module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: 'http://quote-laravel-vue.local/',
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  outputDir: '../../../public',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

  // modify the location of the generated HTML file.
  indexPath: process.env.NODE_ENV === 'production'
    ? '../resources/views/app.blade.php'
    : 'index.html',
};
