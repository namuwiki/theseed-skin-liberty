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