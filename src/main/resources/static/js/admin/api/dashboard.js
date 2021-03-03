$(document).ready(function () {
	$.fn.editable.defaults.url = "/admin/api/in003t/update";
	$.fn.editable.defaults.ajaxOptions = {
		type: "put",
		cache: false,
	};

	function toKRW(value) {
		return moneyFormatter(value) + "원";
	}

	var $table = $("#table");

	$table.bootstrapTable({
		url: "/admin/api/in003t_v1/data",
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
				formatter: function (value, _data, index) {
					return index + 1;
				},
			},
			{
				title: "상품번호",
				field: "quote_no",
				align: "center",
			},
			{
				title: "증권번호",
				field: "sec_no",
				align: "center",
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
				align: "center",
			},
			{
				title: "보험사",
				field: "inscompany",
				align: "center",
			},
			{
				title: "계약일자",
				field: "insdate",
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
				align: "center",
				formatter: moneyFormatter,
			},
			{
				title: "결제방법",
				field: "poption",
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

	//- quote_no, sec_no, prod_code, prod_name, inscompany, already_group_ins, amt_ins, opayment, polholder, insurant_a, insurant_a_mobile, insurant_a_jumina, insurant_a_sex,
	//- insurant_b, premium, insdate, insstdt, inssttm, inseddt, insedtm, ptype, insloc, mobile, email, poption, v_bank_name, v_bank_no, v_bank_due_date, v_bank_auth_dt,
	//- pbohumja_mobile, jumin, owner, pbohumja_birth, rmark, filename, filepath, filesize, ins_date, elagorgninsdamt1, elagorgninsdamt2, elagorgninsdamt3, elagorgninsdamt4,
	//- tpymprem, perprem, govtprem, lgovtprem, advisor_no, advisor_company, advisor_mobile

	$table.on("click-row.bs.table", function (_event, _data, _args) {
		console.log(_event, _data, _args);
		$("#polholder").text(_data.polholder);

		$("#mobile").text(mobileFormatter(_data.mobile));
		$("#email").text(_data.email);
		$("#insurant_a_jumina").text(_data.insurant_a_jumina);

		$("#inscompany").text(_data.inscompany);
		$("#quote_no").text(_data.quote_no);
		$("#sec_no").text(_data.sec_no);
		$("#insperiod").text(_data.insstdt + "~" + _data.inseddt);

		$("#pbohumja_birth").text(_data.pbohumja_birth);
		$("#pbohumja_mobile").text(mobileFormatter(_data.pbohumja_mobile));

		// 5
		$("#insloc").text(_data.insloc);
		$("#main_purps").text(_data.main_purps);
		$("#total_area").text(moneyFormatter(_data.total_area));
		$("#use_apr_date").text(_data.use_apr_date);
		$("#flr_name").text(_data.flr_name);
		$("#main_struct").text(_data.main_struct);
		$("#roof_name").text(_data.roof_name);
		$("#pole_strc").text(_data.pole_strc);
		$("#roof_strc").text(_data.roof_strc);

		$("#elagorgninsdamt1").text(toKRW(_data.elagorgninsdamt1));
		$("#elagorgninsdamt2").text(toKRW(_data.elagorgninsdamt2));
		$("#elagorgninsdamt3").text(toKRW(_data.elagorgninsdamt3));
		$("#elagorgninsdamt4").text(toKRW(_data.elagorgninsdamt4));


		// tpymprem, perprem, govtprem, lgovtprem
		$("#tpymprem").text(toKRW(_data.tpymprem));
		$("#perprem").text(toKRW(_data.perprem));
		$("#govtprem").text(toKRW(_data.govtprem));
		$("#lgovtprem").text(toKRW(_data.lgovtprem));

	});

	$table.on("load-success.bs.table", function (_event, _data, _args) {
		if (_data === undefined || _data.length === 0) {
			return;
		}
		// Send first row click event when loading
		$("#table").find('[data-index="0"]').find("td:eq(0)").click();
	});
});