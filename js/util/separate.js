var Separate = {
    replaceAll: function(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    },
    separate: function(text) {
        text = this.replaceAll(text, " and ", " AND ");
        text = this.replaceAll(text, " or ", " OR ");
        text = this.replaceAll(text, "\\(", "");
        text = this.replaceAll(text, "\\)", "");
        text = this.replaceAll(text, "\\{", "");
        text = this.replaceAll(text, "\\}", "");
        text = this.replaceAll(text, "\"", "");
        text = this.replaceAll(text, "\"", "");

        var arrays = [];

        var ands = text.split(" AND ");

        $.each(ands, function(index1, and){

            var ors = and.split(" OR ");

            if(ors.length > 1){

                var tmp = [];

                $.each(ors, function(index2, or){
                    tmp.push(or);
                });

                arrays.push(tmp);
            }else{
                arrays.push(ors[0]);
            }
        });

        return arrays;
    }
}
