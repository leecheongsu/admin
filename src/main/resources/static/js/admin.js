var defaultXeditableOption = {
	type: "text",
	emptytext: "-",
	// Server side check:
	// 오류가 있어도 HTTP-OK(200) Return, 이럴 경우 success에서 메세지를 리턴하면 오류 표기됨.
	// upload 시(서버에 가지도 않을 경우)도 호출되나, res가 undefined이다.
	success: function (res, newValue) {
		alertify.success("수정하였습니다.");
	},
	error: function (res, newValue) {
		if (res.status === 500) {
			return "Service unavailable. Please try later.";
		} else {
			console.log(res);
			return res.responseJSON.message;
		}
	},
};

var defaultXeditableNumberOption = {
	type: defaultXeditableOption.type,
	emptytext: defaultXeditableOption.emptytext,
	success: defaultXeditableOption.success,
	validate: function (value) {
		if (value === "") return "";
		var data = value.replace(",", "");
		if ($.isNumeric(data) == "") {
			return "숫자만 입력 가능합니다.";
		}
	},
};

var defaultXeditableIntegerOption = {
	type: defaultXeditableOption.type,
	emptytext: defaultXeditableOption.emptytext,
	success: defaultXeditableOption.success,
	validate: function (value) {
		var data = value.replace(",", "");

		if ($.isNumeric(data) == "") return "숫자만 입력 가능합니다.";
		if (data.indexOf(".") > -1) return "정수값만 입력 가능합니다.";
	},
};

var mobileFormatter = function (value) {
	// var phone = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
	var phone = value.replace(/\D*(\d{3})\D*(\d{4})\D*(\d{4})\D*/, "$1-$2-$3");
	if (phone.indexOf("-") === -1) phone = value.replace(/\D*(\d{2})\D*(\d{4})\D*(\d{4})\D*/, "$1-$2-$3");
	return phone;
};

var dateFormatter = function (value) {
	var newstr = value.replace(/-/g, ".");
	return newstr;
};
var moneyFormatter = function (value) {
	return new Intl.NumberFormat().format(value);
};

// Alertify Setting
var delay = alertify.get("notifier", "delay");
alertify.set("notifier", "delay", 1);

var noti_success = function (message) {
	alertify.success(message);
};

var noti_error = function (message) {
	alertify.error(message);
};
