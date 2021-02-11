$(document).ready(function () {
	$.fn.editable.defaults.url = "/admin/api/in008t/update";
	// $.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.ajaxOptions = {
		type: "put",
		// dataType: 'json',
		cache: false,
	};

	var $table = $("#table");

	$table.bootstrapTable({
		url: "/admin/api/in008t/data",
		idField: "uuid",
		pagination: true,
		iconSize: "sm",
		classes: "table table-striped table-hover table-sm",
		search: true,
		showRefresh: true,
		// showToggle: true,
		showColumns: true,
		cache: false,
		pageSize: 20,
		// 가입일자	소속	담당자	핸드폰	등급명	등급	상태
		columns: [
			{
				title: "#",
				field: "id",
				align: "center",
				valign: "middle",
				editable: false,
				formatter: function (value, row, index) {
					return index + 1;
				},
			},
			{
				field: "regdate",
				title: "가입일자",
				sortable: true,
				formatter: function (value, row) {
					// var phone = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
					var newstr = value.replace(/-/g, ".");
					return newstr;
				},
			},
			{
				title: "이메일",
				field: "uuid",
				// visible: false,
			},
			{
				title: "담당자",
				field: "name",
				editable: defaultXeditableOption,
			},
			{
				title: "핸드폰",
				field: "mobile",
				editable: defaultXeditableNumberOption,
				formatter: function (value, row) {
					// var phone = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
					var phone = value.replace(/\D*(\d{3})\D*(\d{4})\D*(\d{4})\D*/, "$1-$2-$3");
					if (phone.indexOf("-") === -1) phone = value.replace(/\D*(\d{2})\D*(\d{4})\D*(\d{4})\D*/, "$1-$2-$3");
					return phone;
				},
			},
			{
				//A:슈퍼유저 B:보험사 C:GA
				title: "등급",
				field: "ulevel",
				// align: "center",
				sortable: true,
				editable: {
					type: "select",
					emptytext: defaultXeditableOption.emptytext,
					error: defaultXeditableOption.error,
					success: defaultXeditableOption.success,
					source: [
						{ value: 'A', text: "슈퍼유저" },
						{ value: 'B', text: "보험사" },
						{ value: 'C', text: "GA" },
					],
				},
			},
			{
				title: "소속",
				field: "comname",
				editable: defaultXeditableOption,
			},
			{
				title: "사업자 번호",
				field: "businessnum",
				editable: defaultXeditableNumberOption,
			},
			{
				title: "상태",
				field: "account_status",
				align: "center",
				editable: {
					type: "select",
					emptytext: defaultXeditableOption.emptytext,
					error: defaultXeditableOption.error,
					success: defaultXeditableOption.success,
					source: [
						{ value: 1, text: "활성" },
						{ value: 2, text: "비활성" },
						{ value: 3, text: "신규" },
					],
				},
			},
			{
				title: "비밀번호",
				type: "password",
				field: "upwd",
				editable: {
					type: "password",
					success: defaultXeditableOption.success,
					error: defaultXeditableOption.error,
				},
			},
		],
	});
});
