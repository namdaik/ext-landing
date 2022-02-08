const runMix = (mix) => {
    const appPerfix = 'ext-landing';
    mix.alias('@extlanding', './src/app/' + appPerfix);
    //di chuyển đường dẫn đến folder root
    mix.setResourceRoot('../../../'); //tim/app/src
    mix.override((config) => {
        delete config.watchOptions;
    });

    let appBuildPath = './public/build/' + appPerfix + '/';
    let appPath = 'src/app/' + appPerfix + '/';
    let appAssets = appPath + 'assets/';
    let appBuildAssets = appBuildPath + 'assets/';

    // đường dẫn file được render
    mix.setPublicPath(appBuildPath);
    // đường dẫn src sau khi được render
    mix.browserSync({
        server: {
            baseDir: appBuildPath,
            directory: false,
            index: 'options.html'
        },
        proxy: false,
        logPrefix: 'PlushHouse',
        open: false,
        notify: false,
        files: [appPath + 'views/*']
    });
    mix.copyDirectory(appAssets , appBuildAssets);
    mix.copyDirectory(appPath , appBuildPath);
    mix.copy(appPath + '/manifest.json', appBuildPath);
    mix.copyDirectory('src/libs', appBuildAssets + 'js');
    //mix.copyDirectory('src/scripts', appBuildAssets + 'scripts');
    ///--------css----------
    //tạo file css
    mix.styles([
        appAssets + 'css/adminlte.css',
        appAssets + 'css/all.css',
        appAssets + 'css/OverlayScrollbars.css',
        appAssets + 'css/select2-bootstrap4.css',
        appAssets + 'css/select2.css',
        appAssets + 'css/bootstrap-colorpicker.css',
        appAssets + 'css/icheck-bootstrap.css',
    ], appBuildAssets + 'css/app.css');
    //mix.copyDirectory('src/scripts', appBuildAssets + 'scripts');
    ///--------js----------
    //tạo file js cho  trang option
    //let controllerPath = 'src/-app/';
    let controllerPath = appPath + 'controllers/';
    mix.js([
        'src/helpers/global.js',
        appPath + 'background.js',
    ], appBuildPath + '/background.js');
    //tạo file js cho app
    mix.js([
        'src/helpers/global.js',
        controllerPath + 'main-controller.js',
    ], appBuildAssets + 'js/client.js');

    mix.js([
        'src/helpers/global.js',
        appPath + 'route.js',
    ], appBuildAssets + 'js/admin.js');
     ///--------script----------
     mix.scripts([
        'src/scripts/datatable-config.js',
        //'public/js/cookie-visited.js',
    ], appBuildAssets + 'js/scripts.js');

    ///--------html----------
    let minifyHtml = {
        removeComments: true,
    };
    //inProduction
    if (mix.inProduction()) {
        minifyHtml = {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            minifyJS: true
        };
    }
    let viewPath = appPath + 'views/';
    let viewPagePath = viewPath + '/pages/'
    mix.html({
        htmlRoot: [ // Your html root file(s)
            viewPagePath + 'index.html',
        ],
        output: '.', // The html output folder
        partialRoot: viewPath + 'components/', // default partial path
        layoutRoot: viewPath + 'layouts/', // default partial path
        minify: minifyHtml
    });
}
module.exports = runMix;