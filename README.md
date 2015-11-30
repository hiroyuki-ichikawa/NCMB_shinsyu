信州観光ハッカソン向け NCMBハンズオン資料

[内容]
- Nifty Cloud mobile backendの特徴 (5分)
　サーバーいらずで、アプリで良く使う機能が利用できます。
 SDKは、iOS/Android/Javascript/Unity
 APIは月に200万回利用可能。
 5秒に一度センサーからデータを受け取っても、約50万回、十分利用できます。
 ストレージも５G。データベースも十分格納できます。

  - プッシュ通知
  - 会員管理・認証
  - SNS連携
    Twitter,Facebook,Google+に対応
  - データストア
    NoSQL形式の柔軟なデータ構造、緯度経度にも対応
    json/csv/txtのインポートも可能。
  - ファイルストア
  　　静的ファイルのセーブ、ロードが可能。
  　　アプリ側から呼び出せるため、アプリに手を加えず情報だけ更新することができます。
  - 緯度経度検索
  　　GPS機能などを利用した位置情報を保存・管理

  →　今回は、この中からデータストア、緯度経度検索を使ってサンプルを作成します。


- 今日のハンズオンの範囲 （10分）
　　- アカウントの作り方
　　　まずは、ログイン画面から新規アカウントを作成しましょう。
　　　https://sso.nifty.com/pub/login.cgi?service=ncmb&back=https%3a%2f%2fconsole.mb.cloud.nifty.com%2f&am=1.2.0
　　　
　　　ダッシュボードのアプリ設定から、新しいアプリを登録しましょう
　　　APIキーの保存

　　- データストアについて
    データストアに新しいクラスとデータの作成を実践
    インポート方法(sample.json利用)

 　- IoTとの連携例
　　　　- RaspberryPIとEdisonは、javascript動くのでnode.jsがそのまま利用可！
　　　　- Arduino、mbedについては、無線か有線経由でhttpクライアントを動かし、node.js経由で情報をアクセス可能。
       REST API使って自力で実装することも可能。

　　- Node.jsを利用したデータの読み書き
　　　　- サンプルコードを利用して、実演　
　　　　- Javascriptファイルも実施 

[参考資料]
　「Nifty Cloud Mobile Backendサイト」
　http://mb.cloud.nifty.com/

　「さすけね」
 http://www.slideshare.net/Hiroyuki_Ichikawa/nifty-cloud-mobile-backend-nodejs