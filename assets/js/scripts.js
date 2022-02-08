let dataTable = null;

function setDataTable(data, columns) {
    dataTable = $('#data-table').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "data": data,
        "columns": columns,
        "info": true,
        "bInfo": true,
        "bFilter": false,
        "autoWidth": false,
        "responsive": true,
        "order": [
            [3, "desc"]
        ],
        "columnDefs": [{
            "defaultContent": "-",
            "targets": "_all"
        }],
        "lengthMenu": [
            [25, 50, -1],
            [25, 50, "All"]
        ]
    });
    dataTable.on('order.dt search.dt', function() {
        dataTable.column(0, {
            search: 'applied',
            order: 'applied'
        }).nodes().each(function(cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
    return dataTable;
}

function datatableAddRow(newData) {
    //dataTable.rows.add(newData).draw();
}