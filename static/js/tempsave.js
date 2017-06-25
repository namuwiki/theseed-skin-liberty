function TempsaveManager(){
    if(window.localStorage) {
        this.available = true;
    } else {
        this.avilable = false;
        return;
    }

    if(!localStorage.getItem('tempsaves')) {
        localStorage.setItem('tempsaves', '{}');
    }
    var readStorage = function(){return JSON.parse(localStorage.getItem("tempsaves"));};
    var writeStorage = function(opts){return localStorage.setItem("tempsaves", JSON.stringify(opts));};

    this.getTempsaves = function(docName) {
        if(readStorage()[docName]) {
            var tempsaves = readStorage()[docName];
            return tempsaves;
        } else {
            return null;
        }
    }
    this.saveTempsave = function(docName, content) {
        var tempsaves = readStorage();
        if(!tempsaves[docName]) {
            tempsaves[docName] = {};
        }
        tempsaves[docName][Date.now().toString()] = content;
        writeStorage(tempsaves);
    }
    this.deleteTempsave = function(docName, timestamp) {
        var tempsaves = readStorage();
        if(tempsaves[docName][timestamp.toString()]) {
            delete tempsaves[docName][timestamp.toString()];
        }
        writeStorage(tempsaves);
    }
    this.deleteTempsaves = function(docName) {
        var tempsaves = readStorage();
        if(tempsaves[docName]) {
            delete tempsaves[docName];
        }
        writeStorage(tempsaves);
    }
    this.clearTempsaves = function(){
        writeStorage({});
    }
}
function readSelectedTempsave() {
    var selectedTimestamp = $("#tempsaveModal select#tempsaveSelect").val();
    if(isNaN(selectedTimestamp) || selectedTimestamp.trim().length == 0) {
        alert('임시저장을 선택해주세요.');
        return;
    } else if (tempsaveManager == null) {
        alert('임시저장 기능을 이용하실 수 없습니다.')
        return;
    }

    var tempsaves = tempsaveManager.getTempsaves(docName);
    $("textarea").val(tempsaves[selectedTimestamp.toString()]);
}

function initTempsaveBtns(){
    var tempsaveButton = $('<button id="tempsaveBtn" class="btn btn-secondary" type="button" style="width: 100px;">임시저장</button>').click(function(){
        var context = $("textarea").val();
        tempsaveManager.saveTempsave(docName, context);
        alert('임시저장 완료.');
    })
    var readTempsaveButton = $('<button id="tempsaveBtn" class="btn btn-secondary" type="button">임시저장 불러오기</button>').click(function(){
        var tempsaves = tempsaveManager.getTempsaves(docName);
        if(tempsaves == null) {
            alert('임시저장이 없습니다.')
            return;
        } else {
            var selectTag = $("#tempsaveModal select#tempsaveSelect");
            selectTag.html();
            for(var ts in tempsaves) {
                var dateObj = new Date(Number(ts));
                selectTag.append('<option value="' + ts + '">' + dateObj.toString() + '에 저장된 임시저장</option>');
            }
            $("#tempsaveModal").modal("show");
        }
    })
    $(".btns").append(tempsaveButton)
    $(".btns").append(readTempsaveButton)
}

var tempsaveManager = null, docName = null;
if(location.pathname.indexOf('/edit/') == 0) {
    docName = decodeURIComponent(location.pathname.substring(6));
    tempsaveManager = new TempsaveManager();
    if(!tempsaveManager.available) {
        tempsaveManager = null;
    } else {
        initTempsaveBtns();
    }
}
