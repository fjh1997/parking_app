//获取car的坐标,第一次进入获得初值(10,10),之后获得上次停留位置.
function get_coordinate() {
	//第一次进入时设置的位置初值。
	var abscissa = "10";
	var ordinate = "10";
	var cookie_array = document.cookie.split(";");
	//如果循环中没有那么返回初值。
	for (var i = 0; i < cookie_array.length; i++) {
		var arr = cookie_array[i].split("=");
		if (arr[0] == "abscissa") {
			abscissa = arr[0];
		}
		if (arr[0] == "ordinate") {
			ordinate = arr[0];
		}
	}
	return {
		x: abscissa,
		y: ordinate
	};
}
//在摇杆停下时调用把位置放到cookie中.
function set_coordinate(abscissa, ordinate) {
	document.cookie = "abscissa=" + abscissa;
	document.cookie = "ordinate=" + ordinate;
}

//在localstorage中写入值
//localstorage中变量chexing的值与车型的关系：轻型车对应1、小型车对应2、微型车对应3
function button_press(number) {
	localStorage.setItem('chexing', number);
	document.getElementById("baocun").style.backgroundColor = "#5CB85C";
	for (i = 1; i < 4; i++) {
		var temp_element = document.getElementById("chexing" + String(i));
		if (i == number) {
			temp_element.setAttribute("style", "background-color: #C1E2B3");
		} else {
			temp_element.setAttribute("style", "background-color: #5CB85C");
		}
	}
}
//从localstorage中读车型对应的数字
function get_chexing(){
	document.getElementById("baocun").style.backgroundColor = "#C1E2B3";
	return  localStorage.getItem('chexing');
}
//按下保存键读取cookie确认是否已经成功保存
function button_confirm() {
	var temp = get_chexing();
	console.log(temp);
	if ((temp == 1) || (temp == 2) || (temp == 3)) {
		alert("保存成功");
	} else {
		alert("保存失败");
	}
}
// function get_cookie() {
// 	//第一次进入时设置的位置初值。
// 	var abscissa = "10";
// 	var ordinate = "10";
// 	var cookie_array = document.cookie.split(";");
// 	//如果循环中没有那么返回初值。
// 	for (var i = 0; i < cookie_array.length; i++) {
// 		var arr = cookie_array[i].split("=");
// 		if (arr[0] == "abscissa") {
// 			abscissa = arr[0];
// 		}
// 		if (arr[0] == "ordinate") {
// 			ordinate = arr[0];
// 		}
// 	}
// 	return {
// 		x: abscissa,
// 		y: ordinate
// 	};
// }

// function set_cookie(abscissa, ordinate) {
// 	document.cookie = "abscissa=" + abscissa;
// 	document.cookie = "ordinate=" + ordinate;
// }
