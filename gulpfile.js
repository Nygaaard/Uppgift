// Variabler
const {src, dest, parallel, series, watch} = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const cssNano = require("gulp-cssnano");
const imageMin = require("gulp-imagemin");
const htmlMin = require("gulp-htmlmin");
const webP = require("gulp-webp");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();


//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
}

//HTML-task - kopiera filer till pub-katalog
function copyHTML() {
    return src(files.htmlPath)
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(dest("pub"))
    .pipe(browserSync.stream());
}

//CSS-task - konkatinerar, minimerar och kopierar
function cssTask() {
    return src(files.cssPath)
    .pipe(concat("styles.css"))
    .pipe(cssNano())
    .pipe(dest("pub/css"))
    .pipe(browserSync.stream());
}

//JS-task - konkatinerar, minimerar och kopierar
function jsTask() {
    return src(files.jsPath)
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest("pub/js"))
    .pipe(browserSync.stream());
}

//Image-task - minimerar och kopierar
function imageTask() {
    return src(files.imagePath)
    .pipe(imageMin())
    .pipe(dest("pub/images"))
    .pipe(browserSync.stream());
}

//Konvertera till webP
function convertToWebP(){
    return src(files.imagePath)
    .pipe(webP())
    .pipe(dest("pub/images"))
    .pipe(browserSync.stream());
}

//Watch
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "./pub"
        }
    });
    watch([files.htmlPath, files.cssPath, files.jsPath, files.imagePath], parallel(copyHTML, cssTask, jsTask, imageTask));
} 

//Exporterar
exports.default = series(
    parallel(copyHTML, cssTask, jsTask, imageTask, convertToWebP),
    watchTask
    );

exports.publish = series(parallel(copyHTML, cssTask, jsTask, imageTask, convertToWebP));