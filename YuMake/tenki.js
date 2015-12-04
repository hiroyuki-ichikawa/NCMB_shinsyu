/*************************/
// お天気APIのサンプルコード
// 2015/12/5 市川電産
/*************************/
var request = require('request');

/*************************/
// 天気予報
/*************************/
request({
    method: 'GET',
    // 下記の業は、信州向けのコードに置き換えましょう
    url: 'http://api.yumake.jp/1.0/forecastPref.php?xxxxxxxx',
    headers: {
        'Content-Type': 'application/json'
    },
    json: {
    }
}, function(err, response, body ){
    // JSON全体を見たいときは、下記を外してね
    //console.log(JSON.stringify(body));
    // 必要な項目だけを引っ張り出す。
    ret = JSON.parse(JSON.stringify(body));
    //console.log( ret );

    // レコード数確認
    cnt = ret.area.length;
    //console.log( cnt );

    // 特定エリアのデータを切り出す
    for( ix = 0; ix < cnt; ix++ ){
        console.log( ret.area[ix].areaName );
        // 天気の概要
        //console.log( ret.area[ix] );

        cnt2 = ret.area[ix].forecastDateName.length;
        for( jx = 0; jx < cnt2; jx++ ){
            tenki = ret.area[ix].forecastDateName[jx] + "の天気は" + ret.area[ix].weather[jx] + "です";

            // 例えば、地域の天気をキーにNCMBのデータストアから特定の情報を
            // 得ることも可能。ここは、皆さんのアイデア次第！

            
            console.log( tenki );
        }
    }

});
