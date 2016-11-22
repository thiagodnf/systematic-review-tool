var Console = {
    clear: function() {
        $("#console").val("");
    },
    print: function(text){
        $("#console").val($("#console").val() + text);
        $('#console').scrollTop($('#console')[0].scrollHeight);
    },
    println: function(text){
        this.print(text + "\n");
    }
}
