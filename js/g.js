function ajaxgencounter(code, start) {
    if (arguments[1] !== undefined) var start = arguments[1];

    if (getCookie('source') != null) var source = getCookie('source');

    if (getCookie('siteid') != null) {
        var siteid = getCookie('siteid');
        setCookie("siteid", siteid);
        code = code.replace(/userid/g, siteid);
        $.facebox('<textarea cols="60" rows="10" onclick="this.focus();this.select()" readonly style="width:588px;">' + code + '</textarea><p>Please do not alter counter code (Except for changing the color or size of the counter). Please keep counter clickable to your visitor and do not put counter into a iframe/div to hide them. We periodically inspect and delete counters that have been violated those rules.</p>');

    } else {
        $.facebox(function() {
            $.get('/reg.php', {
                digi: Math.random(),
                source: source,
                start: start
            },
            function(data) {
                if (data.id > 0) {
                    delCookie("source");
                    //adwords conv
                    adwordsConv();
                    code = code.replace(/userid/g, data.id);
                    setCookie("siteid", data.id);
                    $.facebox('<textarea cols="60" rows="10" onclick="this.focus();this.select()" readonly style="width:588px;">' + code + '</textarea><p>Please do not alter counter code (Except for changing the color or size of the counter). Please keep counter clickable to your visitor and do not put counter into a iframe/div to hide them. We periodically inspect and delete counters that have been violated those rules.</p>');
                }else
					$.facebox('<center><h3>Service is currently down for maintenance. We will be back soon.</h3></center>');
            },
            "json")
        })

    }
}

function setCookie(name, val) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 10000); // 10 seconds
    document.cookie = name + "=" + escape(val) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;

}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function adwordsConv() {
    var ga = document.createElement('IMG');
    ga.src = 'http://www.googleadservices.com/pagead/conversion/1071708137/?label=mCIMCIjXwQIQ6e-D_wM&amp;guid=ON&amp;script=0';
    document.getElementsByTagName("body")[0].appendChild(ga);

}
