window.onload=function () {
    //空格事件
    document.onkeydown=function (e) {
        var kong=e.keyCode
//        console.log(kong)
        if(kong==32){
            kaiguanfun()
        }
    }

    function game() {
        game.perspec()
        game.she = [{x: 0, y: 13}, {x: 1, y: 13}, {x: 2, y: 13}]
        game.setshe()
        game.food = {}
        game.setfood()
        game.par = 'r'
        game.guan=document.querySelector('.guan')
        game.fenshu=document.querySelector('.fenshu')
        // game.move()
        game.dir()
        game.nub=200
    }
//定义背景
    game.perspec = function () {
        var fanwei = document.querySelector('.fanwei')
        // console.log(fanwei)
        var str = '';
        for (var i = 0; i < 25; i++) {
            for (var j = 0; j < 25; j++) {
                str += `<div id=c${j}-${i}></div>`
            }
        }
//    console.log(str)
        fanwei.innerHTML = fanwei.innerHTML + str
    }
//定义蛇
    game.setshe = function () {
        var self=this
        this.she.forEach(function (value,index) {
            // console.log(value.x,value.y)
            var id = `#c${value.x}-${value.y}`
            var s = document.querySelector(id)
            // console.log(s)
            // console.log(self.she.length-1,index)
            if (self.she.length-1==index){
                s.classList.add('shetou')
                s.classList.add('shetour')
            }else {
                s.classList.add('she')
            }
        })
    }
    game.pan = function (x, y) {
        var f = game.she.some(function (value) {
            return value.x == x && value.y == y
        })
//        console.log(1)
//     console.log(f)
        return f
    }
//定义food
    game.setfood = function () {
        game.food = getfood()
        function getfood() {
            do {
                var x = Math.floor(Math.random() * 25);
                var y = Math.floor(Math.random() * 25);
            } while (game.pan(x, y))
            // console.log(game.pan(x,y))
            var idfood = `#c${x}-${y}`
            var f = document.querySelector(idfood)
//    console.log(f)
            f.classList.add('food');
            return {x: x, y: y}
        }

        // console.log(game.food)
    }
//判断点

//运动
    game.move = function () {
        this.t = setInterval(move,game.nub);

        function move() {
            // console.log(game.she)
            var header = game.she[game.she.length - 1];
//        console.log(header,header.x)
            var newheader = header
            switch (game.par) {
                case 'r':
                    newheader = {x: header.x + 1, y: header.y};
                    break;
                case 'l':
                    newheader = {x: header.x - 1, y: header.y};
                    break;
                case 't':
                    newheader = {x: header.x, y: header.y - 1};
                    break;
                case 'b':
                    newheader = {x: header.x, y: header.y + 1};
                    break;
            }
            var newdiv = document.querySelector(`#c${newheader.x}-${newheader.y}`)
            // console.log(newdiv)
            var lasttou=document.querySelector('div.shetou')
            lasttou.classList.add('she')
            lasttou.classList.remove('shetou')
            lasttou.classList.remove('shetour')
            lasttou.classList.remove('shetoul')
            lasttou.classList.remove('shetout')
            lasttou.classList.remove('shetoub')
            if (newdiv == null || game.pan(newheader.x, newheader.y)) {  //判断游戏情况
                let gamet=false
                switch (game.par) {
                    case 'r': lasttou.classList.add('shetour'); gamet=true;break
                    case 'l': lasttou.classList.add('shetoul'); gamet=true;break
                    case 't': lasttou.classList.add('shetout'); gamet=true;break
                    case 'b': lasttou.classList.add('shetoub'); gamet=true;break
                }
                if(gamet){
                    clearInterval(game.t)
                    setTimeout(function () {
                        alert('游戏结束')
                    },1)
                    return;
                }
                return;
            }
            // console.log(newheader)

            // console.log(lasttou)
            newdiv.classList.add('shetou')
            switch (game.par) {
                case 'r': newdiv.classList.add('shetour');break
                case 'l': newdiv.classList.add('shetoul');break
                case 't': newdiv.classList.add('shetout');break
                case 'b': newdiv.classList.add('shetoub');break
            }
            game.she.push(newheader)
            if (newheader.x == game.food.x && newheader.y == game.food.y) {
                var fenshu=document.querySelector('.fenshu')
                // console.log(fenshu)
                game.fenshu.innerText++
                // console.log(fenshu.innerText)
                if(game.fenshu.innerText>=30){
                    console.log(1)
                    clearInterval(game.t)
                    setTimeout(function () {
                       alert('进入下一关')
                        newg()
                        game.nub-=20
                        game.guan.innerText++
                        console.log(game.guan.innerText)
                    },1)
                }
                var newtou=document.querySelector(`#c${game.food.x}-${game.food.y}`)
                    newtou.className = 'shetou'
                switch (game.par) {
                    case 'r': newdiv.classList.add('shetour');break
                    case 'l': newdiv.classList.add('shetoul');break
                    case 't': newdiv.classList.add('shetout');break
                    case 'b': newdiv.classList.add('shetoub');break
                }
                game.setfood()
                // console.log(game.food)
            } else {
                var end = game.she[0];
//        console.log(end)
                var endheader = document.querySelector(`#c${end.x}-${end.y}`)
                endheader.classList.remove('she')
                game.she.shift(endheader)
                // console.log(game.she)
            }
        }
    }
//设置运动方向
    game.dir = function () {
            document.onkeydown = function (e) {
                var on = e.keyCode
//        console.log(on)
                switch (on) {
                    case 37:
                        if (game.par == 'r') {
                            break;
                        }
                        game.par = 'l';

                        break
                    case 38:
                        if (game.par == 'b') {
                            break;
                        }
                        game.par = 't';
                        break
                    case 39:
                        if (game.par == 'l') {
                            break;
                        }
                        game.par = 'r';
                        break
                    case 40:
                        if (game.par == 't') {
                            break;
                        }
                        game.par = 'b';
                        break
                    case 32:
                        kaiguanfun()
                }
                // console.log(game.par)
            }
    }
    game()
    var kaiguan=document.querySelector('.kaiguan')
    var f=true,s=true
    function kai() {
        game.move()
    }
    function guan() {
        clearInterval(game.t)
    }
    function jixu() {
        game.move()
    }
    kaiguan.onclick=function () {
        kaiguanfun()
    }
    function kaiguanfun() {
        if(f){
            f=false
            kai()
            kaiguan.innerText='暂停'
        }else {
            if(s){
                s=false
                guan()
                kaiguan.innerText='继续'
            }else {
                s=true;
                jixu()
                kaiguan.innerText='暂停'
            }
        }
    }


    var newgame=document.querySelector('.newgame')
    newgame.onclick=function () {
        newg()
        game.nub=200
        game.guan.innerText=1
    }
    function newg() {
        {let cla=document.querySelectorAll('.she')
            cla.forEach(function(value,index){
                value.className=''
            })}
        {let cla=document.querySelectorAll('.shetou')
            cla.forEach(function(value,index){
                value.className=''
            })}
        {let cla=document.querySelectorAll('.food')
            cla.forEach(function(value,index){
                value.className=''
            })}
        game.fenshu.innerText=0
        // game()
        game.she = [{x: 0, y: 13}, {x: 1, y: 13}, {x: 2, y: 13}]
        game.setshe()
        game.food = {}
        game.setfood()
        game.par = 'r'
    }
}