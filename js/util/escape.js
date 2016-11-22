var Escape = {
    escape: function(arrays, startSymbol, endSymbol) {
        var result = "(";

        if(arrays.length > 1){

            $.each(arrays, function(index1, array){

                if(Array.isArray(array)){

                    if(array.length > 1){

                        $.each(array, function(index2, cell){
                            result += startSymbol + cell + endSymbol;

                            if(index2 + 1 < array.length){
                                result += " OR ";
                            }
                        });
                    }else{
                        result += startSymbol + array[0] + endSymbol;
                    }
                }else{
                    result += startSymbol + array + endSymbol;
                }

                if(index1 + 1 < arrays.length){
                    result += ") AND (";
                }
            });
        }else{
            result += startSymbol + arrays + endSymbol;
        }

        result += ")";

        return result;
    }
}
