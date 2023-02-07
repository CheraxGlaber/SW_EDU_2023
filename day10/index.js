const http = require("http");
const express = require("express"); // 모듈 사용을 위해 선언
const cors = require("cors");
const app = express(); // 변수 app으로 REST End Point들을 생성

// 'public'이라는 디렉터리 밑에 있는 데이터들은 웹브라우저의 요청에 따라 서비스를 제공가능
// app.use(express.static('public')); // static이란 직접 값에 변화를 주지 않는 이상 변하지 않는 파일
app.use(express.static(__dirname + '/public'));

// cors 미들웨어를 이용해서 크로스 오리진 문제 해결
app.use(cors());

// npm install --save ejs // ejs : view 생성 모듈
app.set("view engine", "ejs"); // ejs는 미들웨어라서 use가 아닌 set으로 사용
app.set("views", "./template");

const saramList = [
    {"no":1, "name":"kim", "email":"kim@saram.com", "phone":"0110-1111-1111"},
    {"no":2, "name":"lee", "email":"lee@saram.com", "phone":"010-1111-2222"},
    {"no":3, "name":"park", "email":"park@saram.com", "phone":"010-1111-3333"},
    {"no":4, "name":"kang", "email":"kang@saram.com", "phone":"010-1111-4444"},
    {"no":5, "name":"choi", "email":"choi@saram.com", "phone":"010-1111-5555"}
];

app.get("/saram/list", (req, res) => { // 서버에서 받을 수 있는 형태가 됨
    res.send({saramList}); // res.send({saramList: saramList});와 동일
    
});

app.get("/", (req, res)=>{
    /*
        res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"}); // writeHead에 쓰인 것은 한글을 사용하기 위해서 필수
        // html 태그 삽입
        res.write("<h1>환영합니다!</h1>");
        res.write("<ul><li><a href='/html/js_day05ex01_1.html'>ex01_1</a></li>"); // 같은 폴더에 있는 실습 html로 이동
        res.write("<li><a href='/home'>home</a></li></ul>"); // home으로 이동하는 링크 생성
        res.end();
    */
    res.redirect("main.html"); // 다른 페이지로 갱신시킨다.
});

app.get("/home", (req, res)=>{
    // home.ejs 템플릿이 보여 지도록 한다.
    // req.app.render(ejs파일명, 데이터객체, 콜백함수);
    // 콜백함수의 첫번째는 err객체
    var testArr = [
        {no:1, name:"홍길동", age:12},
        {no:2, name:"김길동", age:15},
        {no:3, name:"박길동", age:13},
        {no:4, name:"최길동", age:14}
    ];
    req.app.render("home", {testArr}, (err, html) => {
        if(err != null) { // 에러가 없으면 html 화면 출력
            console.log("오류 발생!");
            res.end();
        } else {
            res.end(html);        
        }
    });
});

// 서버 실행에 필수
const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("서버 실행 중 : localhost:3000");
});

// nodejs 설치하면 npm이 같이 설치 된다.
// npm : 패키지 매니저
// 자동으로 모듈을 설치하고 제거 하고 관리한다.
// npm install --save 모듈
// npm i -S 모듈(express, cors, nodemon, ejs)
// express 모듈 : 서버 설정
// nodemon 모듈 : 서버 자동 갱신
// --save : 현재 프로젝트에 저장. -S
// --svae-dev : 개발환경에서만 사용. -D
// -g : 글로벌 환경에 저장
// npm unintall -g 모듈
// npm list -g --depth=0