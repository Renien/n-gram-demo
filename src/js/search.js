/**
 * Created by thanujap on 3/14/16.
 */

 $( document ).ready(function() {
   $('#div-head').transition('fade');
   $('#div-data').transition('fade');
   $("#div-debug").transition('fade');
   $("#div-json-viewer").transition('fade');
   $("#div-loader").transition('fade');
 });

//Search button click
function search() {
    var query = $("#searchQuery").val();
    console.log();
    if(query!=""){
        $("#div-loader").transition('fade'); //Show the loader
        query = query.replace(' ','%20');
//        console.log("query",query);
        var url = getSearchUrl(searchUrl,query,$("#display-debug").is(':checked'));
        console.log(url);
        var headers = {"X-APP-API_KEY": appApiKey,"rid":rid};
        console.log(headers);
        callUrl(url, headers)
        //displayResults(searchData);
    }else{
        emptyQuery();
    }


}

function callUrl(url,headers){
    // $.ajax({
    // method: 'get',
    // url: url,
    // headers: headers,
    // success:function(data, status){
    //     console.log(url,', ',status);
    //     console.log(JSON.stringify(data));
    //     displayResults(data);
    // }
    // });

    $.ajax({
      method: 'get',
      url: url,
      crossDomain : true,
      success: function(result){
        displayInit($("#display-debug").is(':checked'), $("#display-option").val());
        $("#div-loader").transition('fade');
        displayResults(result);
    }});
}

function displayResults(data){
    var option = $("#display-option").val();
    console.log(option);
    if (option == "json"){
        displayJson(data);
    }else{
        displayVisualise(data);
    }
}

function emptyQuery(){
    $("#h2-empty-query").show();
}


function getSearchUrl(url, query, debug){
    return url.replace("##query##", query)
              .replace("##debug##", debug);
}
