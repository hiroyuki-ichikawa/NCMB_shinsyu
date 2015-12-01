/**************************************/
// 市川電産 2015/11/30
// NCMB サンプルコード
/**************************************/
var http = require('http');
var url  = require('url');
var qs   = require('querystring');

// NCMB ライブラリ
NCMB = require('./ncmb-latest.min.js').NCMB;
NCMB.initialize("アプリケーションキー",  "クライアントキー");


/**************************************/
// 適宜テーブル名は変更数
/**************************************/
var SpotClass = NCMB.Object.extend("sample");

var query   = new NCMB.Query(SpotClass);
var addData = new SpotClass();


/**************************************/
//mobile backend上のデータ検索を実行する
/**************************************/
var server=http.createServer();

server.on('request',function(req,res){
    console.log(req.url);

    var urlInfo = url.parse(req.url);
    var pathname = urlInfo.pathname;

    switch(pathname){
        case '/search':
            ////////////////////
            // 地点検索用
            ////////////////////
            var  lat = 36.6617052;      // 善光寺の代表ポイント
            var  lng = 138.1855176;     // 

            /******************/
            // 返却部分
            /******************/
            res.writeHead(200, { 'Content-Type': 'application/json' });
            //位置情報をもとに検索する条件を設
            var geoPoint = new NCMB.GeoPoint(lat,lng);
            // クエリーの条件を決める 範囲は10km以内
            query.withinKilometers("geo", geoPoint, 10);
            
            query.find({
                success: function(points) {
                    // 検索が成功した場合の処理
                    var data = [];

                    console.log( points.length );
                    for (var i = 0; i < points.length; i++){
                        var point = points[i];

                        data.push({
                            Id      : point.get("objectId"),
                            geo     : point.get("geo"),
                            name    : point.get("name")
                        });

                    }
                    console.log( JSON.stringify(data) );
                    res.end( JSON.stringify(data) );
                },
                error: function(error) {
                    // 検索に失敗した場合の処理
                    console.log(error.message);
                    res.end(JSON.stringify({ 'err': 'err' }));

                }
            });
            break;
        case '/add':
            /////////////////////
            // 追加登録
            /////////////////////
            console.log( "add" );
            console.log( req.method );
            var addData = new SpotClass();
            
            if(req.method=='GET'){

                var url_parts = url.parse(req.url,true);
                console.log(url_parts.query);

                // lat = 緯度、 long = 経度、 name = 施設名
                // 例：　http://localhost:3000/add?lat=36.6296225&long=138.1816461&name=信州大学工学部
                if( ( url_parts.query['lat'] != null ) && ( url_parts.query['long'] != null ) &&
                    ( url_parts.query['name'] != null ) ){
                    ////////////////////////
                    // 緯度経度による登録
                    ////////////////////////
                    var lat = Number( url_parts.query['lat'] );
                    var lng = Number( url_parts.query['long'] );
                    var geo_str = new NCMB.GeoPoint({latitude: lat, longitude: lng})
                    addData.set("geo", geo_str );
                    addData.set("name", url_parts.query['name'] );
                    addData.save(null, {
                        success: function(addData) {
                            // 保存完了後に実行される
                            console.log("New object created with objectId: " + addData.id);
                        },
                        error: function(addData, error) {
                            // エラー時に実行される
                            console.log("Failed to create new object, with error code: " + error.message);
                        }
                    });


                    console.log( url_parts.query['lat'], url_parts.query['long'], url_parts.query['kind'] );
                }

            }

            res.end(JSON.stringify({ 'add': '' }));
            break;
    }
}).listen(3000);
console.log('Server is starting');


