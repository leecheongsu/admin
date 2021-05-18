$(document).ready(function () {
	$.fn.editable.defaults.url = "/admin/api/in003t/update";
	$.fn.editable.defaults.ajaxOptions = {
		type: "put",
		cache: false,
	};

	function toKRW(value) {
		if (isNaN(value)) return "-";
		return moneyFormatter(value) + "원";
	}

	$(".datepicker").datepicker();

	$("#p_from").datepicker("setDate", moment().add(-1, "years").toDate());
	$("#p_to").datepicker("setDate", moment().toDate());


	var $table = $("#table");



	$("#queryButton").click(function () {
		$table.bootstrapTable('refresh');
	});

	$("#oneweekButton").click(function () {
		$("#p_from").datepicker("setDate", moment().add(-1, "weeks").toDate());
	});
	$("#onemonthButton").click(function () {
		$("#p_from").datepicker("setDate", moment().add(-1, "months").toDate());
	});
	$("#threemonthButton").click(function () {
		$("#p_from").datepicker("setDate", moment().add(-3, "months").toDate());
	});
	$("#sixmonthButton").click(function () {
		$("#p_from").datepicker("setDate", moment().add(-6, "months").toDate());
	})



	$("#excelButton").click(function () {
		// ref: https://blogs.perficient.com/2016/08/11/the-hoops-necessary-to-download-a-csv-using-jquery-ajax/
		$.ajax({
			type: "GET",
			url: "/admin/api/in003t_v1/data",
			data: {
				p_prod_code: $("#p_prod_code").val(),
				p_from: $("#p_from").val(),
				p_to: $("#p_to").val(),
				pageSize: 10000,
				pageNumber: 1,
			},
			dataType: "json",
			success: function (data) {
				console.log(data.rows);
				json = data.rows;
				// var fields = Object.keys(json[0]);
				var fields = [
					"quote_no",
					"sec_no",
					"prod_name",
					"inscompany",
					"insdate",
					"insstdt",
					"inseddt",
					"premium",
					"poption",
					"ptype",
					"polholder",
					"mobile",
					"stat",
				];
				var field_names = [
					"상품번호",
					"증권번호",
					"상품명",
					"보험사",
					"계약일자",
					"보험시작일",
					"보험종료일",
					"보험료",
					"결제방법",
					"납입형태",
					"계약자",
					"연락처",
					"상태",
				];
				var replacer = function (key, value) {
					return value === null ? "" : value;
				};
				var csv = json.map(function (row) {
					return fields
						.map(function (fieldName) {
							var value = row[fieldName];
							if (fieldName === "poption") {
								if (value == "5") return "간편이체";
								if (value == "4") return "신용카드";
								if (value == "3") return "신용카드(비인증)";
							}
							if (fieldName === "ptype") {
								if (value == "0") return "일시납";
								return value + "개월할부";
							}
							if (fieldName === "mobile") {
								return mobileFormatter(value) ;
							}
							return JSON.stringify(value, replacer);
						})
						.join(",");
				});
				csv.unshift(field_names.join(",")); // add header column
				csv = csv.join("\r\n");
				// console.log(csv);

				downloadFile("가입현황.csv", csv);
				noti_success("success");
			},
			error: function (e) {
				console.log(e);
				noti_error("fail");
			},
		});
	});


	$table.bootstrapTable({
			url: "/admin/api/in203t_v1/data",
			idField: "uuid",
			pagination: true,
			sidePagination: "server",
			iconSize: "sm",
			classes: "table table-hover table-sm",
			// search: true,
			//  showRefresh: true,
			// showToggle: true,
			// showColumns: true,
			cache: false,
			pageSize: 20,
			queryParamsType: "",
			queryParams: function (params) {
				params.p_prod_code = $("#p_prod_code").val();
				params.p_from = $("#p_from").val();
				params.p_to = $("#p_to").val();
				return params;
			},
			pagination: true,
			sidePagination: "server",
			clickToSelect: true,
			columns: [
				{
					radio:true
				},
				{
					title: "#",
					field: "id",
					align: "center",
					valign: "middle",
					editable: false,
					formatter: function (value, _data, index) {
						return index + 1;
					},
				},
				{
					title: "상품번호",
					field: "quote_no",
					sortable: true,
					align: "center",
				},
				{
					title: "증권번호",
					field: "sec_no",
					align: "left",
				},
				{
					title: "상품코드",
					field: "prod_code",
					align: "center",
					visible: false,
				},
				{
					title: "상품명",
					field: "prod_name",
					sortable: true,
					align: "center",
				},
				{
					title: "보험사",
					field: "inscompany",
					sortable: true,
					align: "center",
				},
				{
					title: "계약일자",
					field: "insdate",
					sortable: true,
					align: "center",
					formatter: dateFormatter,
				},
				{
					title: "보험기간",
					field: "insstdt",
					align: "center",
					formatter: function (value, _data) {
							return _data.insstdt + "~" + _data.inseddt;

					},
				},
				{
					title: "보험료",
					field: "premium",
					align: "right",
					formatter: moneyFormatter,
				},
				{
					title: "결제방법",
					field: "poption",
					sortable: true,
					align: "center",
					formatter: function (value, _data) {
						if (value == "5") return "간편이체";
						if (value == "4") return "신용카드";
						if (value == "3") return "신용카드(비인증)";
						return "오류";
					},
				},
				{
					title: "납입형태",
					field: "ptype",
					align: "center",
					formatter: function (value, _data) {
						if (value == "0") return "일시납";
						return value + "개월할부";
					},
				},
				{
					title: "계약자",
					field: "polholder",
					align: "center",
				},
				{
					title: "연락처",
					field: "mobile",
					align: "center",
					formatter: mobileFormatter,
				},
				{
					title: "상태",
					field: "stat",
					align: "center",
				},
				{
					title: "already_group_ins",
					field: "already_group_ins",
					visible: false,
				},
				{
					title: "amt_ins",
					field: "amt_ins",
					visible: false,
				},
				{
					title: "opayment",
					field: "opayment",
					visible: false,
				},
				{
					title: "insurant_a",
					field: "insurant_a",
					visible: false,
				},
				{
					title: "insurant_a_jumina",
					field: "insurant_a_jumina",
					visible: false,
				},
				{
					title: "insurant_a_sex",
					field: "insurant_a_sex",
					visible: false,
				},
				{
					title: "insurant_b",
					field: "insurant_b",
					visible: false,
				},
				{
					title: "inssttm",
					field: "inssttm",
					visible: false,
				},
				{
					title: "보험종료일",
					field: "inseddt",
					visible: false,
				},
				{
					title: "insedtm",
					field: "insedtm",
					visible: false,
				},
				{
					title: "insloc",
					field: "insloc",
					visible: false,
				},
				{
					title: "mobile",
					field: "mobile",
					visible: false,
				},
				{
					title: "email",
					field: "email",
					visible: false,
				},
				{
					title: "v_bank_name",
					field: "v_bank_name",
					visible: false,
				},
				{
					title: "v_bank_no",
					field: "v_bank_no",
					visible: false,
				},
				{
					title: "v_bank_due_date",
					field: "v_bank_due_date",
					visible: false,
				},
				{
					title: "v_bank_auth_dt",
					field: "v_bank_auth_dt",
					visible: false,
				},
				{
					title: "pbohumja_mobile",
					field: "pbohumja_mobile",
					visible: false,
				},
				{
					title: "jumin",
					field: "jumin",
					visible: false,
				},
				{
					title: "pbohumja_birth",
					field: "pbohumja_birth",
					visible: false,
				},
				{
					title: "rmark",
					field: "rmark",
					visible: false,
				},
				{
					title: "filename",
					field: "filename",
					visible: false,
				},
				{
					title: "filepath",
					field: "filepath",
					visible: false,
				},
				{
					title: "filesize",
					field: "filesize",
					visible: false,
				},
				{
					title: "ins_date",
					field: "ins_date",
					visible: false,
				},
				{
					title: "elagorgninsdamt1",
					field: "elagorgninsdamt1",
					visible: false,
				},
				{
					title: "elagorgninsdamt2",
					field: "elagorgninsdamt2",
					visible: false,
				},
				{
					title: "elagorgninsdamt3",
					field: "elagorgninsdamt3",
					visible: false,
				},
				{
					title: "elagorgninsdamt4",
					field: "elagorgninsdamt4",
					visible: false,
				},
				{
					title: "tpymprem",
					field: "tpymprem",
					visible: false,
				},
				{
					title: "perprem",
					field: "perprem",
					visible: false,
				},
				{
					title: "govtprem",
					field: "govtprem",
					visible: false,
				},
				{
					title: "lgovtprem",
					field: "lgovtprem",
					visible: false,
				},
				{
					title: "추천인",
					field: "advisor_no",
					visible: false,
				},
				{
					title: "advisor_company",
					field: "advisor_company",
					visible: false,
				},
				{
					title: "advisor_mobile",
					field: "advisor_mobile",
					visible: false,
				},
			],
		});

	// - quote_no, sec_no, prod_code, prod_name, inscompany, already_group_ins, amt_ins, opayment, polholder, insurant_a, insurant_a_mobile, insurant_a_jumina, insurant_a_sex,
	// - insurant_b, premium, insdate, insstdt, inssttm, inseddt, insedtm, ptype, insloc, mobile, email, poption, v_bank_name, v_bank_no, v_bank_due_date, v_bank_auth_dt,
	// - pbohumja_mobile, jumin, owner, pbohumja_birth, rmark, filename, filepath, filesize, ins_date, elagorgninsdamt1, elagorgninsdamt2, elagorgninsdamt3, elagorgninsdamt4,
	// - tpymprem, perprem, govtprem, lgovtprem, advisor_no, advisor_company, advisor_mobile
	//
	$table.on("click-row.bs.table", function (_event, _data, _args) {
		console.log(_event, _data, _args);

		$("#polholder").text(_data.polholder);

		$("#mobile").text(mobileFormatter(_data.mobile));
		$("#quote_no").text(_data.quote_no);
		$("#sec_no").text(_data.sec_no);
		$("#insloc").text(_data.insloc);
		$("#flr_name").text(_data.flr_name);
		$("#inscompany").text(_data.inscompany);
		$("#filename").attr("href", "/admin/dashboard/file?filename=" + _data.filename);
		$("#filename").text(_data.filename);


		if(_data.prod_code == "Gh007")
		{
			$("#insperiod").text(_data.insstdt + "~" + _data.inseddt);
			$("#email").text("해당정보없음");
			$("#insurant_a_jumina").text(_data.insurant_a_jumina);
			$("#insurant_b").text(_data.insurant_b);
			$("#pbohumja_birth").text(_data.pbohumja_birth);
			$("#pbohumja_mobile").text(_data.mobile);
			$("#main_purps").text("해당정보없음");
			$("#use_apr_date").text("해당정보없음");
			$("#main_struct").text("해당정보없음");
			$("#roof_name").text("해당정보없음");
			$("#pole_strc").text("해당정보없음");
			$("#roof_strc").text("해당정보없음");
		} else {
			$("#insperiod").text(_data.insstdt + "~" + _data.inseddt);
			$("#email").text(_data.email);
			$("#insurant_a_jumina").text(_data.insurant_a_jumina);
			$("#insurant_b").text(_data.insurant_b);
			$("#pbohumja_birth").text(_data.pbohumja_birth);
			$("#pbohumja_mobile").text(mobileFormatter(_data.pbohumja_mobile));
			$("#main_purps").text(_data.main_purps);
			$("#use_apr_date").text(_data.use_apr_date);
			$("#main_struct").text(_data.main_struct);
			$("#roof_name").text(_data.roof_name);
			$("#pole_strc").text(_data.pole_strc);
			$("#roof_strc").text(_data.roof_strc);
		}

		$("#total_area").text(moneyFormatter(_data.total_area));
		// tpymprem, perprem, govtprem, lgovtprem
		$("#tpymprem").text(toKRW(_data.tpymprem));
		$("#perprem").text(toKRW(_data.perprem));
		$("#govtprem").text(toKRW(_data.govtprem));
		$("#lgovtprem").text(toKRW(_data.lgovtprem));

		$("#preminums > tbody").empty();
		// 현대해상 보험료 내역
		if (_data.prod_code == "h007" || _data.prod_code == "Gh007") {
			$("#preminums > tbody").append(
				'<tr><td class="bg-right">풍수해(건물)</td><td class="w-30 text-right">' +
					toKRW(_data.elagorgninsdamt1) +
					'</td><td class="w-30 text-right">-</td></tr>'
			);
			$("#preminums > tbody").append(
				'<tr><td class="bg-right">풍수해(시설및집기)</td><td class="w-30 text-right">' +
					toKRW(_data.elagorgninsdamt2) +
					'</td><td class="w-30 text-right">-</td></tr>'
			);
			$("#preminums > tbody").append(
				'<tr><td class="bg-right">풍수해(재고자산)</td><td class="w-30 text-right">' +
					toKRW(_data.elagorgninsdamt3) +
					'</td><td class="w-30 text-right">-</td></tr>'
			);
			$("#preminums > tbody").append(
				'<tr><td class="bg-right">풍수해(자기부담금)</td><td class="w-30 text-right">' +
					toKRW(_data.elagorgninsdamt4) +
					'</td><td class="w-30 text-right">-</td></tr>'
			);
		}

		// 메리츠화재 보험료 내역
		if (_data.prod_code == "m002" && _data.preminums) {
			_data.preminums.forEach(function (preminum) {
				console.log(preminum);
				var ins_amt = toKRW(preminum.ins_amt);
				var amt = toKRW(preminum.premium);
				$("#preminums > tbody").append(
					'<tr><td class="bg-right">' +
						preminum.name +
						'</td><td class="w-30 text-right">' +
						ins_amt +
						'</td><td class="w-30 text-right">' +
						amt +
						"</td></tr>"
				);
			});
		}

		// 8
		if ($("#rmark").hasClass("editable")) $("#rmark").editable("destroy");
		$("#rmark").text(_data.rmark);

		$("#rmark").editable({
			url: "/admin/api/in003t/update",
			mode: "inline",
			pk: _data.quote_no,
			title: "Enter comments",
			type: "textarea",
			emptytext: defaultXeditableOption.emptytext,
			error: defaultXeditableOption.error,
			success: function(res, newValue) {
				_data.rmark = newValue;
				alertify.success("수정하였습니다.");
			},
			ajaxOptions: {
				type: "put",
			},
			rows: 3,
		});
	});

	$table.on("load-success.bs.table", function (_event, _data, _args) {
		if (_data === undefined || _data.length === 0) {
			return;
		}
		// Send first row click event when loading
		$("#table").find('[data-index="0"]').find("td:eq(0)").click();
		$("#total").text(_data.total);
	});

	$("#btnUpload").on("click", function (event) {
		event.preventDefault();

		var form = $("#uploadForm")[0];
		var data = new FormData(form);

		if (form[0].files.length < 1) {
			noti_error("먼저 파일을 선택하세요!");
			return;
		}
		data.append("quote_no", $("#quote_no").text());

		$("#btnUpload").prop("disabled", true);

		$.ajax({
			type: "POST",
			enctype: "multipart/form-data",
			url: "/admin/dashboard/upload",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function (data) {
				console.log(data);
				$("#filename").text(data);
				$("#btnUpload").prop("disabled", false);
				noti_success("success");
			},
			error: function (e) {
				console.log(e);
				$("#btnUpload").prop("disabled", false);
				noti_error("fail");
			},
		});
	});
});
