# 前端開發自動化

前端開發樣板自動化套件整理。

## 必須安裝

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)

## 步驟

開始囉！

### 安裝 Git

官方下載 Git 並安裝好。[連結](https://git-scm.com/)

### 設定 Git 使用者

安裝好 Git 之後，瀏覽安裝的目錄，可以看到 **Git Bash**，開啟 **Git Bash** 輸入以下指令，設定「使用者名稱」`user.name` 和「使用者信箱」`user.email`。

```bash
git config --global user.name "你的 GitHub 用戶名"
git config --global user.email "你的 GitHub 註冊信箱"
```

> `--global`：全域設定

### 生成 ssh 密鑰

如果你要推送到自己的 GitHub 就必須要生成 ssh 密鑰，輸入以下指令。

```bash
ssh-keygen -t rsa -C "你的 GitHub 註冊信箱"
```

此時，在用戶文件夾下就會有一個新的文件夾 `.ssh`，裡面有剛剛創建的 ssh 密鑰文件 id_rsa 和 `id_rsa.pub`。

> `id_rsa` 文件是私鑰，要妥善保管，`id_rsa.pub` 是公鑰文件。

### 設定 GitHub 公鑰

連結到 [GitHub](https://github.com) 網站，添加公鑰的位置是在 **GitHub** > **Settings** > **SSH and GPG keys** > 點擊 **New SSH key** 按鈕。
將 `id_rsa.pub` 中的內容複製到 **Key** 文本框中，然後點擊 **Add SSH key**（添加 SSH）按鈕。

### 測試 SSH

```bash
ssh -T git@github.com
```

接下來會出來下面的確認信息。

```bash
The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 17:24:ac:a5:76:28:24:36:62:1b:36:4d:eb:df:a6:45.
Are you sure you want to continue connecting (yes/no)? yes
```

輸入 yes 後按**鍵盤 Enter**。

```bash
Hi "你的帳號"! You've successfully authenticated, but GitHub does not provide shell access.
```

### 下載 GitHub 專案

輸入以下指令，從 GitHub 下載此專案！

```bash
git clone https://github.com/TpWILovePanda/frontend-starter-kit.git
```

下載好之後，移動到 **frontend-starter-kit** 資料夾。

```bash
cd frontend-starter-kit
```

### 安裝 Bower、Gulp

```bash
npm install -g gulp bower
```

### 安裝套件

使用 npm 和 bower 進行安裝開發用工具套件

```bash
npm install && bower install
```

### 啟動

恭喜你都安裝完成囉，輸入以下指令開始使用吧！別忘記在瀏覽器輸入 `localhost:7777`。

```bash
gulp
```

## 使用的套件與相關連結

使用到的套件列表。

### gulp-jade

HTML 樣板語言。[連結](https://www.npmjs.com/package/gulp-jade)

### gulp-sass

強大的 CSS 預處理器。[連結](https://www.npmjs.com/package/gulp-sass)

### gulp-plumber

讓 Gulp 在運行的過程中遇錯不會中斷。[連結](https://www.npmjs.com/package/gulp-plumber)

### gulp-postcss

強大的 CSS 後處理器。[連結](https://www.npmjs.com/package/gulp-postcss)

### autoprefixer

自動為 CSS 補上前綴詞。[連結](https://www.npmjs.com/package/autoprefixer)

### gulp-load-plugins

簡化 gulp 載入流程。[連結](https://www.npmjs.com/package/gulp-load-plugins)

### gulp-babel

JavaScript ES6 編譯工具。[連結](https://www.npmjs.com/package/gulp-babel)

### babel-preset-es2015

JavaScript ES6 編譯工具。[連結](https://www.npmjs.com/package/babel-preset-es2015)

### gulp-sourcemaps

標示壓縮、合併程式碼的原始位置。[連結](https://www.npmjs.com/package/gulp-sourcemaps)

### gulp-concat

合併串接程式碼。[連結](https://www.npmjs.com/package/gulp-concat)

### Browser Sync

前端愛用的 Web Server。[連結](https://www.npmjs.com/package/browser-sync)，包含 Livereload。[連結](https://browsersync.io/docs)

### main-bower-files

Bower 工具。[連結](https://www.npmjs.com/package/main-bower-files)

### gulp-minify-css

CSS 壓縮工具。[連結](https://www.npmjs.com/package/gulp-minify-css)

### gulp-uglify

JavaScript 壓縮工具。[連結](https://www.npmjs.com/package/gulp-uglify)

### minimist

將指令碼匯入 gulp 流程。[連結](https://www.npmjs.com/package/minimist)

### gulp-if

將 gulp 加入判斷式。[連結](https://www.npmjs.com/package/gulp-if)

### gulp-clean

刪除文件和文件夾。[連結](https://www.npmjs.com/package/gulp-clean)

### gulp-sequence

依次運行一系列的 gulp task 任務。

### gulp-imagemin

圖片壓縮 Minify PNG, JPEG, GIF 和 SVG images。[連結](https://www.npmjs.com/package/gulp-imagemin)

### gulp-gh-pages

讓 `public` 檔案，可以快速發佈內容到 Github Pages。[連結](https://www.npmjs.com/package/gulp-gh-pages)

### gulp-data

主要目的是返回 ( return ) 一個物件。[連結](https://www.npmjs.com/package/gulp-data)

## 循序安裝流程

要先引入 gulp 前端自動化 `const gulp = require('gulp');`。

1. HTML 樣板語言。
    * `const pug = require('gulp-pug');`
1. 強大的 CSS 預處理器。
    * `const scss = require('gulp-sass');`
1. 讓 Gulp 在運行的過程中遇錯不會中斷。
    * `const plumber = require('gulp-plumber');`
1. CSS 套件。
    1. 強大的 CSS 後處理器。
        * `const postCss = require('gulp-postcss');`
    1. 自動為 CSS 補上前綴詞。
        * `const autoprefixer = require('autoprefixer');`
1. 簡化 gulp 載入流程。
    * `const $ = require('gulp-load-plugins');`
1. JavaScript ES6 編譯工具。
    * `const babel = require('gulp-babel');`
1. 標示壓縮、合併程式碼的原始位置。
    * `const sourcemaps = require('gulp-sourcemaps');`
1. 合併串接程式碼。
    * `const concat = require('gulp-concat');`
1. Bower 工具。
    * `const mainBowerFiles = require('main-bower-files');`
1. 使用 Bower 工具時，可以透過陣列排列自己所需要的順序。
    * `const order = require('gulp-order');`
1. Web Server 伺服器。
    * `const browserSync = require('browser-sync').create();`
1. 壓縮工具。
    1. CSS 壓縮工具，不推薦使用，作者不再維護。
        * `const minifyCss = require('gulp-minify-css');`
    1. CSS 壓縮工具，推薦使用。
        * `const cleanCss = require('gulp-clean-css');`
    1. JavaScript 壓縮工具。
        * `const uglify = require('gulp-uglify');`
1. 將指令碼匯入 gulp 流程。
    * `const minimist = require('minimist');`
1. 將 gulp 加入判斷式。
    * `const gulpif = require('gulp-if');`
1. 刪除文件和文件夾。
    * `const clean = require('gulp-clean');`
1. 依次運行一系列的 gulp task 任務。
    * `const gulpSequence = require('gulp-sequence');`
1. 圖片壓縮 Minify PNG, JPEG, GIF and SVG images。
    * `const imagemin = require('gulp-imagemin');`
1. 讓 `public` 檔案，可以快速發佈內容到 Github Pages。
    * `const ghPages = require('gulp-gh-pages');`
1. 重新命名檔案，依情況調整引入。
    * `const rename = require('gulp-rename');`

## gulp 載入分類

未使用**簡化 gulp 載入流程**（`gulp-load-plugins`）引入分類，詳細可參考 [`gulpfile2.js`](gulpfile2.js)。

```js
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
```

## 安裝指令套件

`npm install` 中的 `--save` 與 `--save-dev`差異，取決於你放出的產品流程，需不需要載入 `gulp`。

* 如果你的產品流程需要用到 `gulp`，就要用 `--save`。
* 如果你的產品流程不需要用到 `gulp`，就要用 `--save-dev`。

舉例來說，產品架設於 [Herok](https://www.heroku.com/) 上面，它預設只會安裝 `--save` 裡面的套件，如果你的產品需要用到 `gulp` 將不會運行！

1. 只會安裝產品用的套件
    * `npm install --only=prod`
1. 只會安裝開發用的套件
    * `npm install --only=dev`
1. 它會保留你想要保留的環境，依據你的 `package.json` 做調整
    * `npm prune --prod` 保留**產品用的套件**
    * `npm prune --dev` 保留**開發用的套件**

## Template Language

pug Template Language。

1. include
    * 載入外部區塊
1. block
    * 作為其它頁面的內容顯示區域
    * 與 Extend 一起使用
1. extend
    * 將其它頁面作為延伸
    * 內容會在 block 內出現

## 參考資源 (References)

* [JavaScript程式設計新手村 - 一看就懂的前端開發環境建置入門教學](http://blog.kdchang.cc/2016/11/05/how-to-establish-modern-front-end-development-environment-tutorial/)
* [使用 gulp 進行網頁前端自動化 - 六角學院](https://www.udemy.com/gulp-learning/learn/v4/overview)

## 關於作者（Author）

* [Tien-Yi, Chen](https://tpwilovepanda.github.io/)

## 版權許可（License）

* MIT
