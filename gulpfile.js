// Variabler
const {src, dest, parallel, series, watch} = require("gulp");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const cssNano = require("gulp-cssnano");
const imageMin = require("gulp-imagemin");


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
    .pipe(dest("pub"));
}

//CSS-task - konkatinerar, minimerar och kopierar
function cssTask() {
    return src(files.cssPath)
    .pipe(concat("styles.css"))
    .pipe(cssNano())
    .pipe(dest("pub/css"));
}

//JS-task - konkatinerar, minimerar och kopierar
function jsTask() {
    return src(files.jsPath)
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(dest("pub/js"));
}

//Image-task - minimerar och kopierar
function imageTask() {
    return src(files.imagePath)
    .pipe(imageMin())
    .pipe(dest("pub/images"));
}

//Watch
function watchTask() {
    watch([files.htmlPath, files.cssPath, files.jsPath, files.imagePath], parallel(copyHTML, cssTask, jsTask, imageTask));
} 

//Exporterar
exports.default = series(
    parallel(copyHTML, cssTask, jsTask, imageTask),
    watchTask
    );

exports.publish = series(parallel(copyHTML, cssTask, jsTask, imageTask));