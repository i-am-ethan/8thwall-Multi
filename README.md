# 8thwall-MultiPlayer with Socket.io

# 設計書

[目的](#目的)
[今回作るサンプルプロジェクト詳細](#今回作るサンプルプロジェクト詳細)
[サーバーサイド](#サーバーサイド)
[クライアントサイド](#クライアントサイド)

### 目的
8thwallのサンプルプロジェクトにはマルチプレイ機能がない。
実装して、より双方向なAR体験を実現したい。

### 今回作るサンプルプロジェクト詳細
まずは、サンプルプロジェクトを作るところから始める。
このgithubに訪れた人がコードを容易に理解し、拡張しやすいサンプルプロジェクトでなければならない。

サンプルプロジェクトの必要要件
1. 8thwallを使っている
2. ルームが存在し、そのルームに入った人はお互いが表示した3Dオブジェクトを見ることができる


### サーバーサイド
1. サーバー側
・node.js:14.17.6
・express:4.17.1
・socket.io:4.2.0


### クライアントサイド
1. インターフェイス：index.html
ルームオーナーはルームを作成できる。
ルーム参加者はルームオーナーが設定した部屋番号を入力することでそのルームにアクセスすることができる。

2. AR体験画面：multi.html
ルームに遷移するタイミングで8thwallを起動。
ルームオーナーが作ったルームに接続。
地面をタップすることで3Dオブジェクトを表示することができる。
その情報は同じルームの相手の画面にも同じように表示される。