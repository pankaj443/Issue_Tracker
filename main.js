function saveIssue(e){
    console.log(1);
    var issuedesc = document.getElementById('issuedesc').value;
    console.log(issuedesc);
    var issueseverity = document.getElementById('issueseverity').value;
    var issueassign = document.getElementById('issueassign').value;
    var issueid = chance.guid();
    var issuestatus = 'Open';

    var issue = {
        id: issueid,
        description : issuedesc,
        severity : issueseverity,
        assignedto : issueassign,
        status : issuestatus
    }

    if(localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        console.log(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        console.log(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }

    document.getElementById('issueform').reset();

    fetchissue();

    e.preventDefault();
}

function setstatuscloded(id){
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0 ;i < issues.length ; i++)
    {
        if(issues[i].id == id)
        {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchissue();
}
function deleteissue(id){
    
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0 ;i < issues.length ; i++)
    {
        if(issues[i].id == id)
        {
            issues.splice(i,1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchissue();
    

}
function fetchissue(){
   
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuelist = document.getElementById('issuelist');

    issuelist.innerHTML = '';

    for(var i = 0 ; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedto = issues[i].assignedto;
        var status = issues[i].status;

        issuelist.innerHTML +=  '<div class = "well"'+
                                '<h6> Issue ID: '+ id + '</h6>'+
                                '<p><span class = "label label-info"> '+ status +' </span></p> '+
                                '<h3> '+ desc + ' </h3> ' +
                                '<p>  <span class="glyphicon glyphicon-time"> </span>' + severity + ' </p> '+
                                '<p>  <span class = "glyphicon glyphicon-user"> </span>' + assignedto + ' </p> '+
                                '<a href = "#" onclick = "setstatuscloded(\''+id+'\')" class = "btn btn-warning">Close</a> '+
                                '<a href = "#" onclick= "deleteissue(\''+id+'\')" class = "btn btn-danger">Delete</a> '+
                                '</div>';
                            }
} 