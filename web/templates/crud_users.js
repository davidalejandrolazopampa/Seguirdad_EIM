$(function(){
    var url = "http://127.0.0.1:5000/users";
    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url ,
            insertUrl: url ,
            updateUrl: url ,
            deleteUrl: url ,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        remoteOperations: {
            sorting: true,
            paging: true
        },
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },
        onEditorPreparing(e) {
            if(e.parentType == "dataRow" && e.dataField == "password")
                e.editorOptions.mode = 'password';
          },
        columns: [{
                    dataField: "id",
                    dataType: "number",
                    allowEditing: false
                   }, {
                    dataField: "username",
                    validationRules: [{ type: "required" }, { type: "email" }]
                   }, {
                    dataField: "name"
                   }, {
                    dataField: "lastname"
                   }, {
                    dataField: "password",
                    editorOptions: {
                        mode: "password"
                                   },
                    customizeText: function(e){
                        return '*********';
                    }
                  }, ],
    }).dxDataGrid("instance");
});
