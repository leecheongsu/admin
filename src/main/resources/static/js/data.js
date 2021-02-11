$(document).ready(function () {
	// ref: https://bootstrap-table.com/docs/api/column-options/#events
	// ref: http://vitalets.github.io/x-editable/docs.html
	$.fn.editable.defaults.url = '/api/update';
	// $.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.ajaxOptions = {
		type: 'put',
		// dataType: 'json',
		cache: false,
	};

	var $table = $("#table");
    
	$table.bootstrapTable({
		url: "/api/data",
		idField: "uuid",
		pagination: true,
        iconSize: 'sm',
		classes: "table table-striped table-hover table-sm",
		pageSize: 20,
		columns: [
			{
				title: '#',
				field: 'id',
				align: 'center',
				valign: 'middle',
				editable: false,
                formatter:function(value,row,index){
                    return index + 1;
                }
			},
			{
				title: "ID",
				field: "uuid",
                editable: defaultXeditableOption
			},
			{
				title: "Name",
				field: "name",
                editable: defaultXeditableOption
			},
			{
				title: "mobile",
				field: "mobile",
			},
			{
				title: "ulevel",
				field: "ulevel",
			},
			{
				field: "comname",
				title: "comname",
                editable: defaultXeditableOption
			},
			{
				field: "businessnum",
				title: "businessnum",
                editable: defaultXeditableNumberOption
			},
			{
				field: "regdate",
				title: "regdate",
			},
			{
				field: "account_status",
				title: "상태",
			},
		],
	});
});
