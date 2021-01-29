var gamecanvas = document.getElementById("gameCanvas");
var choicecanvas = document.getElementById("choiceCanvas");    // 获取元素choicecanvas 
var container = document.getElementById("container");

var map = document.getElementById("map");

var gamecontext = gamecanvas.getContext("2d");
var choicecontext = choicecanvas.getContext("2d");

var car_x = 0;
var car_y = 0;
var pressure_x = 0;
var pressure_y = 0;
choicecanvas.width = gamecanvas.width = 375;
choicecanvas.height = gamecanvas.height = 250;

// 这段开始是监听choiceCanvas
var elemLeft = container.offsetLeft,
    elemTop = choicecanvas.offsetTop,
    elements = [],
    start_node = [],
    nodeindex,
    widthlist = [5, 5, 6],
    heightlist = [9, 13, 18],
    node,
    flag=0,
    limit = 0,
    save_node,
    backupCanvas = document.createElement('canvas'),
    backupCtx = backupCanvas.getContext('2d');
backupCanvas.width = choicecanvas.width;
backupCanvas.height = choicecanvas.height;
// 12个矩形 
elements.push({ width: 40, height: 26, top: 50, left: 42, index: 1 },
    { width: 40, height: 26, top: 50, left: 112, index: 2 },
    { width: 40, height: 26, top: 49, left: 193, index: 3 },

    { width: 40, height: 26, top: 95, left: 42, index: 4 },
    { width: 40, height: 26, top: 95, left: 112, index: 5 },
    { width: 40, height: 26, top: 95, left: 193, index: 6 },

    { width: 40, height: 26, top: 140, left: 42, index: 7 },
    { width: 40, height: 26, top: 140, left: 112, index: 8 },
    { width: 40, height: 26, top: 140, left: 193, index: 9 },

    { width: 40, height: 26, top: 188, left: 42, index: 10 },
    { width: 40, height: 26, top: 188, left: 112, index: 11 },
    { width: 40, height: 26, top: 188, left: 193, index: 12 });
//从localstorage中读取数据并绘制图形
elements.forEach(function (ele) {
    // context.fillStyle = ele.colour;
    //context.fillRect(ele.left, ele.top, ele.width, ele.height);
    save_node = JSON.parse(localStorage.getItem('node' + ele.index));
    // console.log(save_node);
    if (save_node == null) {
        start_node[ele.index] = new Node();
        start_node[ele.index].rect = new Rect(ele.left, ele.top, ele.width, ele.height);

    }
    else {
        start_node[ele.index] = new Node(save_node);
        drawNode(start_node[ele.index]);
        backupCtx.drawImage(choicecanvas, 0, 0);

    }
});
function clearnode() {
    elements.forEach(function (ele) {
        // context.fillStyle = ele.colour;
        //context.fillRect(ele.left, ele.top, ele.width, ele.height);
        localStorage.removeItem('node' + ele.index);

    });


    location.reload();

}

choicecanvas.addEventListener('click',choice , false);
function choice (event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - 184;
    console.log(x, y);
    // console.log(elemTop,elemLeft)
    // console.log(event.pageX,event.pageY);
    elements.forEach(function (ele) {
        // console.log(ele.left,ele.top);
        if (y > ele.top && y < ele.top + ele.height && x > ele.left && x < ele.left + ele.width) {

            choicecontext.clearRect(0, 0, choicecanvas.width, choicecanvas.height);
            initnode();

            choicecontext.strokeStyle = "#FF0000";
            choicecontext.strokeRect(ele.left, ele.top, ele.width, ele.height);
            // console.log("clicked");

            if (limit == 1) return;



            var rect_type = localStorage.getItem('chexing');
            if (rect_type == null) {
                alert("请去车辆信息栏选择车型"); return;
            }
            var rect = new Rect(0, 0, // x/y don't matter here; it has no position yet
                widthlist[rect_type],
                heightlist[rect_type]);
            console.log(start_node[ele.index]);

            node = start_node[ele.index].insert_rect(rect);
            console.log(start_node[ele.index]);
            if (node) {
                nodeindex = ele.index;

                var r = node.rect;
                choicecontext.strokeStyle = "#FF0000";

                choicecontext.strokeRect(r.x, r.y, r.w, r.h);

            }
            limit = 1;
           if(flag==0) {
               document.getElementById("yuyue").addEventListener('click', order);
               flag=1;
        }
                function order (event) {
                    savenode(); 
                    alert("预约成功！");
                    daohang_method(1);
                    document.getElementById("dao").disabled=true;
                    document.getElementById("dao").onclick=null;
                    
                   }
            function savenode() {
                if (node) {
                    var r = node.rect;
                    choicecontext.fillStyle = "#ff0000";
                    // ctx.clearRect(r.x, r.y, r.w+2, r.h+2);

                    choicecontext.fillRect(r.x, r.y, r.w, r.h);
                }

                localStorage.setItem('node' + nodeindex, JSON.stringify(start_node[nodeindex]));
            }
         
            function initnode() {
                // console.log(ele.index);
                save_node = JSON.parse(localStorage.getItem('node' + ele.index));

                if (save_node == null) {
                    start_node[ele.index] = new Node();
                    start_node[ele.index].rect = new Rect(ele.left, ele.top, ele.width, ele.height);

                }
                else {
                    start_node[ele.index] = new Node(save_node);
                }
                choicecontext.clearRect(0, 0, canvas.width, canvas.height);
                choicecontext.drawImage(backupCanvas, 0, 0);

                node = null;
                limit = 0;

            }

        }
    });
}

var render = function () {
    //将canvas的图像绘制到gamecanvas中
    gamecontext.clearRect(0, 0, gamecanvas.width, gamecanvas.height);
    car_x += pressure_x;
    car_y += pressure_y;
    gamecontext.drawImage(canvas, car_x, car_y, 20, 20);
};


var id2 = setInterval("render()", 50);   // 这里的数字是调速度的

var joystick = nipplejs.create({
    zone: document.getElementById('driver'),
    mode: 'static',
    position: { top: '20%', right: '50%' },
    color: 'green',
    size: 100
});

//这个是那个遥感
joystick.on('move',
    function (evt, data) {
        if (data.direction != null) {
            switch (data.direction.angle) {
                case "up":
                    pressure_y = -data.distance / 30;
                    pressure_x = 0;
                    break;
                case "down":
                    pressure_y = data.distance / 30;
                    pressure_x = 0;
                    break;
                case "left":
                    pressure_x = -data.distance / 30;
                    pressure_y = 0;
                    break;
                case "right":
                    pressure_x = data.distance / 30;
                    pressure_y = 0;
                    break;
                default:
            }
        }

    }

).on('end', function (evt, data) {
    pressure_x = pressure_y = 0
});