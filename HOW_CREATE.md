# 制作手順
### 1. socket.io環境の構築
```
npm init
node -v
v14.17.6
npm install express
npm install socket.io
```

### 2. インターフェイスを作成する
・index.htmlファイルを作成する。


### 3. 8thwall画面を作成する
・multi.htmlファイルを作成する。
・8thwallの画面に遷移させる

### 4. githubとherokuを連携する
```
heroku login (初回のみ)
git init(初回のみ)
git add .
git commit -m ""
heroku create(初回のみ)
git push heroku master
heroku apps:rename newname(heroku appの名前を変更したい場合)
heroku open
```

...つづく