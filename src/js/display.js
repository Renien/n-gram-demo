/**
 * Created by Renien on 3/22/16.
 */

function displayJson(data){
    var jsonViewer = $("#div-json-viewer");
    jsonViewer.empty();
    var container = document.getElementById('div-json-viewer');
    var options = {mode: 'view'};
    new JSONEditor(container, options, data);
}

function displayVisualise(data){
    fillData(data.data);
    if($("#display-debug").is(':checked') == true)
      fillDebugData(data.debug);
    fillMataData(data.meta);
}

function displayInit(debug, format){

    //headers
    if($('#div-head').attr("class") != "transition visible"){
      $('#div-head').transition('fade');
    }

    //visualize
    if(format == "visualize"){
      if($('#div-data').attr("class") != "transition visible"){
        $('#div-data').transition('fade');
      }
      if($('#div-debug').attr("class") != "transition visible" &&
        debug == true){
        $('#div-debug').transition('fade');
      }
      if($('#div-debug').attr("class") == "transition visible" &&
        debug == false){
        $('#div-debug').transition('fade');
      }

      if($('#div-json-viewer').attr("class") == "json-view ui transition visible"){
        $('#div-json-viewer').transition('fade');
      }
    }
    else{ //json
      if($('#div-data').attr("class") == "transition visible"){
        $('#div-data').transition('fade');
      }
      if($('#div-debug').attr("class") == "transition visible"){
        $('#div-debug').transition('fade');
      }
      if($('#div-json-viewer').attr("class") != "json-view ui transition visible"){
        $('#div-json-viewer').transition('fade');
      }
    }
}

function fillDebugData(data){
    console.log(JSON.stringify(data));
    displayTokens(data.tokens);
    displayPosTags(data.pos_tags);
    displayNgrams(data.ngrams);
    $("#k-url").attr("href", data.preview.kohlsEnchanced)
}


function displayTokens(data){
    var table = $("#table-tokens");
    table.empty();
    var cols = [];
    for (var i=0; i<data.length;i++) {
        var width = cssWidth(data[i]);
        var html = '<div class="circle token center">'+data[i]+'</div>';
        cols.push($(html).css("width", width));
    }
    addRow(table,cols)

}

function displayNgrams(data){
    var table = $("#table-ngrams");
    table.empty();
    var cols = [];
    for (var i=0; i<data.length;i++) {
        var ngrams = data[i].ngrams;
        for (var j=0; j<ngrams.length;j++){
            var width = cssWidth(ngrams[j]);
            var html = '<div class="circle ngram center">'+ngrams[j]+'</div>';
            cols.push($(html).css("width", width))
        }
    }
    addRow(table,cols);
}

function displayPosTags(data){
    var table = $("#table-pos-tags");
    table.empty();
    var cols = [];
    for (var i=0; i<data.length;i++) {
        var tokenTag = data[i];
        var token = '<div class="circle token center">'+tokenTag.token+'</div>';
        var arrow = '<div class="square-up-arrow center">' +
            '<i class="long arrow down icon"></i>';
        var tag = '<div class="square tag center">'+tokenTag.tag+'</div>';
        var html = token + arrow + tag;
        cols.push($(html));
    }
    addRow(table, cols);
}

function fillMataData(metaData){
    if(metaData.length > 0){
        //$("#div-meta").show();
        var table = $("#table-meta");
        table.empty();
        for (var i=0; i<metaData.length;i++){
            var data = metaData[i];
            var keyWidth = cssWidth(data.key);
            var valueWidth = cssWidth(data.value);
            var key = '<div class="circle value">'+data.key+'</div>';
            var arrow = '<div class="stretch-2">&#8594;</div>';
            var value = '<div class="square field">'+data.value+'</div>';
            var cols = [$(key).css("width",keyWidth), $(arrow), $(value).css("width",valueWidth)];
            addRow(table,cols);
        }
    }
}


function fillData(data){
    $("#original_query").text(data.original_query);
    $("#modified_query").text(data.modified_query);
    displayFilters(data.filters);
    DisplayFields(data.fields);
}

function displayFilters(data){
    if(data.length>0){
        var table = $("#table-filters");
        table.empty();
        var cols = [];
        for (var i=0; i<data.length;i++){
            var filter = data[i];
            var field = '<div class="square filter center">'+filter.field+'</div>';
            var value = filter.operator + " " + filter.values;
            var operator = '<div class="circle filter center">'+value+'</div>';
            var arrow = '<div class="square-up-arrow center filter">' +
                '<i class="long arrow down icon"></i>';
            var html = field + arrow +operator;
            cols.push($(html))
        }
        addRow(table,cols);
    }

}

function DisplayFields(fields){
    var table = $("#table-fields");
    table.empty();
    for (var i=0; i<fields.length;i++){
        var data = fields[i];
        var valueWidth = cssWidth(data.value);
        var fieldWidth = cssWidth(data.field);
        var value = '<div class="circle value center">'+data.value+'</div>';
        var arrow = '<i class="long arrow right icon"></i>';
        var field = '<div class="square field center">'+data.field+'</div>';
        var cols = [$(value).css("width",valueWidth), $(arrow), $(field).css("width",fieldWidth)];
        addRow(table,cols);
    }
}

function addRow(table,cols){
    var row = $('<tr/>');
    for(var i=0; i<cols.length; i++){
        var col = $('<td/>').append(cols[i]);
        row.append(col);
    }
    table.append(row);
}

function cssWidth(word){
    var value = 80;
    var length = word.length *10;
    if (length<value){
        length = value;
    }
    return length+"px";
}
