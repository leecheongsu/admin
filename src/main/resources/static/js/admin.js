var defaultXeditableOption = {
	type: "text",
	emptytext: "-",
	// Server side check:
	// 오류가 있어도 HTTP-OK(200) Return, 이럴 경우 success에서 메세지를 리턴하면 오류 표기됨.
	// upload 시(서버에 가지도 않을 경우)도 호출되나, res가 undefined이다.
	success: function (res, newValue) {
	},
	error: function (res, newValue) {
		if (res.status === 500) {
			return "Service unavailable. Please try later.";
		} else {
			return res.message;
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
		if ($.isNumeric(data) == "") return "숫자만 입력 가능합니다.";
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

$(document).ready(function () {});
