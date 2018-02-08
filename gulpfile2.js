const gulp = require('gulp'); // 前端自動化

// HTML
const pug = require('gulp-pug');

// CSS
const scss = require('gulp-sass');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');

// JavaScript
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// 圖片
const imagemin = require('gulp-imagemin');

// 其它
const plumber = require('gulp-plumber');
const $ = require('gulp-load-plugins');
const mainBowerFiles = require('main-bower-files');
const order = require('gulp-order');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');
const gulpif = require('gulp-if');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');

// const rename = require('gulp-rename'); // 重新命名檔案，依情況調整

// 環境選項
const envOptions = {
    string: 'env',
    default: {
        env: 'develop'
    }
}

// 透過 minimist 把參數記錄下來，process.argv.slice(2) 這行則是跳過前兩個 -- 字元，直接讀取 env 這個字串
const options = minimist(process.argv.slice(2), envOptions);

// 路徑設定
const path = {
    src: 'source',
    plc: 'public'
};

const pugPaths = {
    src: `./${path.src}/**/*.pug`,
    dest: `./${path.plc}/`
};

const scssPaths = {
    src: `./${path.src}/scss/**/*.scss`,
    dest: `./${path.plc}/css`
};

const jsPaths = {
    src: `./${path.src}/js/**/*.js`,
    dest: `./${path.plc}/js`
};

const imgPaths = {
    src: `./${path.src}/img/**/*`,
    dest: `./${path.plc}/img`
};

// 刪除文件和文件夾
gulp.task('clean', function () {
    return gulp.src(['./.tmp', './public'], {
            read: false
        })
        .pipe(clean());
});

// 複製 HTML
gulp.task('copyHTML', () => {
    return gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./public/'));
});

// 編譯 Pug 任務，完成後送到 dist/*.html
gulp.task('pug', () => {
    return gulp.src(pugPaths.src)
        .pipe(plumber()) // 遇錯不會中斷
        .pipe(gulpif(options.env === 'production', pug({
            pretty: false // true: 不壓縮, false: 壓縮
        })))
        .pipe(gulpif(options.env !== 'production', pug({
            pretty: true // true: 不壓縮, false: 壓縮
        })))
        .pipe(gulp.dest(pugPaths.dest)) // 匯出位置
        .pipe(browserSync.stream()); // 重新載入
});

// 編譯 Scss 任務，完成後送到 dist/css/main.css
gulp.task('sass', () => {
    let plugins = [
        autoprefixer({
            browsers: ['last 3 version', 'ie 8']
        })
    ];

    return gulp.src(scssPaths.src)
        .pipe(plumber()) // 遇錯不會中斷
        .pipe(sourcemaps.init()) // 標示壓縮、合併程式碼的原始位置，初始化
        .pipe(scss({
            outputStyle: 'nested',
            includePaths: ['./bower_components/bootstrap/scss']
        }).on('error',  scss.logError)) // 編譯完成 CSS
        .pipe(postCss(plugins)) // 強大的 CSS 後處理器
        // if 判斷式，當傳入參數是 --env production，才會進行壓縮
        .pipe(gulpif(options.env === 'production', cleanCss())) // CSS 壓縮工具
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.')) // 標示壓縮、合併程式碼的原始位置
        .pipe(gulp.dest(scssPaths.dest))
        .pipe(browserSync.stream());
});

// 編譯 JavaScript 轉譯、合併、壓縮任務，完成後送到 dist/js/bundle.js
gulp.task('babel', () => {
    return gulp.src(jsPaths.src)
        .pipe(sourcemaps.init()) // 標示壓縮、合併程式碼的原始位置，初始化
        .pipe(babel({ // 轉譯
            presets: ['es2015']
        }))
        // 「個別重新命名」與「全部合併」兩種方法，選一種即可
        // 「個別重新命名方法」
        // .pipe(rename((path) => {
        //   path.basename += ".min";
        //   path.extname = ".js";
        // }))
        // 「全部合併方法」
        .pipe(concat('all.js'))
        .pipe(gulpif(options.env === 'production', uglify({ // 醜化
            compress: {
                drop_console: false // true: 移除 console, false: 顯示 console
            }
        })))
        .pipe(sourcemaps.write('.')) // 標示壓縮、合併程式碼的原始位置
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(browserSync.stream());
});

// Bower 管理
gulp.task('bower', () => {
    return gulp.src(mainBowerFiles({
            "overrides": {
                "bootstrap": { // 套件名稱
                    "main": "dist/js/bootstrap.js" // 取用的資料夾路徑
                },
                "vue": {
                    "main": "dist/vue.js"
                }
            }
        }))
        .pipe(gulp.dest('./.tmp/vendors'));
});

// Gulp 與 Bower 程式碼串接
gulp.task('vendorJS', ['bower'], () => {
    return gulp.src('./.tmp/vendors/**/**.js')
        .pipe(order([
            'jquery.js',
            'bootstrap.js'
        ]))
        .pipe(concat('vendors.js')) // 「全部合併方法」
        .pipe(gulpif(options.env === 'production', uglify())) // 醜化
        .pipe(gulp.dest(jsPaths.dest));
});

// 複製 img 任務，完成後送到 public/img
gulp.task('img', () => {
    return gulp.src(imgPaths.src)
        .pipe(plumber()) // 遇錯不會中斷
        .pipe(imagemin())
        .pipe(gulp.dest(imgPaths.dest));
});

// Static server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        reloadDebounce: 2000 // 重新整理的間隔必須超過 2 秒，依據需求調整使用
    });
});

// 監聽檔案更新
gulp.task('watch', () => {
    gulp.watch(pugPaths.src, ['pug']);
    gulp.watch(scssPaths.src, ['sass'], ['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss']);
    gulp.watch(jsPaths.src, ['babel']);
});

gulp.task('sequence', gulpSequence('clean', 'pug', 'sass', 'babel', 'vendorJS', 'img'));

// 預設模式
gulp.task('default', ['pug', 'sass', 'babel', 'vendorJS', 'img', 'browser-sync', 'watch']);

// 建構模式，壓縮程式碼指令 gulp bulid --env production
gulp.task('build', ['sequence']);