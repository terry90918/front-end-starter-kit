# 前端入門套件 (Frontend Starter Kit)

Lightweight front-end development boilerplate. (NodeJS/NPM/ES6/Gulp/Bower/Scss/GitHub)

## 主要工具

1. [NodeJS/NPM](https://nodejs.org/)

2. [Gulp](http://gulpjs.com/)

3. [Bower](https://bower.io/)

4. [Scss](http://sass-lang.com/)

5. [GitHub](https://github.com/)

## 方法步驟 (Usage)

1. 安裝 Git，開啟 Git Bash，設定 user.name 和 user.email：( --global: 全域設定 )
```
$ git config --global user.name "你的 GitHub 用戶名"
$ git config --global user.email "你的 GitHub 註冊信箱"
```

2. 如果你要推送到自己的 GitHub 就必須要生成 ssh 密鑰，如果沒有則可以跳至`步驟 5`，輸入以下指令，此時，在用戶文件夾下就會有一個新的文件夾 .ssh，裡面有剛剛創建的 ssh 密鑰文件 id_rsa 和 id_rsa.pub。注：id_rsa 文件是私鑰，要妥善保管，id_rsa.pub 是公鑰文件。
```
$ ssh-keygen -t rsa -C "你的 GitHub 註冊信箱"
```

3. 連結到 [GitHub](https://github.com) 添加公鑰到 `GitHub > Settings > SSH and GPG keys`
```
$ ssh -T git@github.com
```

4. 接下來會出來下面的確認信息：輸入 yes
```
The authenticity of host 'github.com (207.97.227.239)' can't be established. 
RSA key fingerprint is 17:24:ac:a5:76:28:24:36:62:1b:36:4d:eb:df:a6:45.
Are you sure you want to continue connecting (yes/no)? yes
```

5. 克隆資源
```
$ git clone https://github.com/TpWILovePanda/frontend-starter-kit.git
```

6. 移動到 frontend-starter-kit 資料夾
```
$ cd frontend-starter-kit
```

7. 安裝 Bower、Gulp 工具 ( 已經安裝過 Bower、Gulp 可以跳過步驟七 )
```
$ npm install -g gulp bower
```

8. 使用 npm 和 bower 進行安裝開發用工具套件
```
$ npm install && bower install
```

9. 啟動 Server
```
$ gulp
```

10. Check the browser `localhost:7777`

### 進階 `package.json` 設定快捷鍵
```
{
	"scripts": {
		"start": "gulp", 
		"build": "gulp build" 
	}
}
```

## 參考資源 (References)
* [一看就懂的前端開發環境建置入門教學](http://blog.kdchang.cc/2016/11/05/how-to-establish-modern-front-end-development-environment-tutorial/)

## 關於作者（Author）
* [@TpWILovePanda](https://tpwilovepanda.github.io/)

## 版權許可（License）
* ![創用 CC 授權條款](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)
* 本著作係採用[創用 CC 姓名標示-相同方式分享 4.0 國際 授權條款](http://creativecommons.org/licenses/by-sa/4.0/)授權.