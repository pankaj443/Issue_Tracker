document.getElementById('issueform').addEventListener('submit',saveIssue);

function saveIssue(e){

    var issuedesc = document.getElementById('issuedesc').value;
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
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }

    document.getElementById('issueform').reset();

    fetchissue();

    e.preventDefault();
}

function fetchissue(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuelist = document.getElementById('issuelist');

    issuelist.innerHTML = '';

    for(var i = 0 ; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].desc;
        var severity = issues[i].severity;
        var assignedto = issues[i].assignedto;
        var status = issues[i].status;

        issuelist.innerHTML +=  '<div class = "well"'+
                                '<h6> Issue ID: '+ id + '</h6>'+
                                '<p><span class = "label label-info">'+status +'</span></p>'+
                                '<h3>'+ desc + '</h3>' +
                                '<p><span class = "glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class = "glyphicon glyphicon-user"></span>' + assignedto + '</p>'+
                                '<a href = "#" onclick = "setstatuscloded(\''+id+'\')" class = "btn btn-warning">Close</a>'+
                                '<a href = "#" onclick= "deleteissue(\''+id+'\')" class = "btn btn-danger">Delete</a>'+
                                '</div>';
                            }
}