// TO-DO : 이거 이용해서 설정 구현.
var Uman = (function(){
    var userSettings = {};
    this.getItem = function(key, defaultVal) {
        if(typeof defaultVal === 'undefined') {
            var defaultVal = null;
        }
        if(userSettings[key]) {
            return userSettings[key];
        } else {
            return defaultVal;
        }
    };
    this.setItem = function(key, val) {
        userSettings[key] = val;
        this.saveSettings();
    };
    this.reset = function() {
        userSettings = {};
        this.saveSettings();
    };
    this.loadSettings = function() {
        if(window.localStorage && localStorage["uman.user_settings"]) {
            userSettings = JSON.parse(localStorage["uman.user_settings"]);
        } else {
            userSettings = {};
        }
    };
    this.saveSettings = function() {
        if(window.localStorage) {
            localStorage.setItem("uman.user_settings", JSON.stringify(userSettings))
        }
    }
    this.isStorageSupported = function() {
        return typeof window.localStorage !== 'undefined';
    }
    return this;
})();
if (!window.uman)
    window.uman = Uman;
uman.loadSettings();

function deleteAllTempsaves(n) {
    var tempsaveManager = new TempsaveManager();
    if (n == 0) {
        var docName = prompt('문서 이름을 입력하세요.');
        tempsaveManager.deleteTempsaves(docName);
        alert('완료했습니다');
    } else if (n == 1) {
        if(confirm('정말로 모든 임시저장을 삭제하시겠습니까?')) {
            tempsaveManager.clearTempsaves();
            alert('완료했습니다');
        }
    }
}