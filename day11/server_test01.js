const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
// npm i -S formidable
const formidable = require('formidable');
const fs = require("fs");

// app.set("key", "value")  - setAttribute 용도로 사용
// app.get("key");  - getAttribute의 용도로 사용
// app.get("path", 콜백함수)  - 서버의 doGet 역할
// app.post("path", 콜백함수)  - 서버의 doPost 역할
app.set("port", 3000);
// console.dir(app); // app의 구조가 다 보여짐

app.set("view engine", "ejs");
app.set("views", __dirname + "/template");

app.use(cors());
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});


app.post("/saram/input", (req, res)=>{ // parse가 끝나면 end로 넘어옴, on은 이벤트 핸들러를 걸어줌
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.dir(files);
        var oldpath = files.photo.filepath;
        var newpath = 'C:/Users/User/upload/' + files.photo.originalFilename;
        fs.rename(oldpath, newpath, function (err) { // rename으로 oldpath에서 newpath로 경로를 바꾸면서 이름도 변경
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end(); // end 끝난 시점에 이벤트 발생
        });
    });
});


// http와 express의 결합 - 같은 port를 공유한다.
const server = http.createServer(app);
server.listen(app.get("port"), ()=>{
    console.log("서버 실행 중 - http://localhost:"+ app.get("port") );
});
