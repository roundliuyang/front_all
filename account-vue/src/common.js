Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    return fmt;
};

Number.prototype.withComma = function () {
    return this.toString().withComma();
};

String.prototype.withComma = function () {
    var num = this.split('.'),
        integerPart = num[0],
        decimalPart = num[1],
        result = '';
    while (integerPart.length > 3) {
        result = ',' + integerPart.slice(-3) + result;
        integerPart = integerPart.slice(0, integerPart.length - 3);
    }
    if (integerPart) {
        result = integerPart + result;
    }
    if (decimalPart) {
        result += '.' + decimalPart;
    }
    return result;
};

export default new class Common {
    getParameter(s) {
        var sPageURL = decodeURIComponent(self.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === s) {
                return sParameterName[1];
            }
        }
    }


    _isChar = char => {
        var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+={}[].,';
        if (str.indexOf(char) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    _isNumber = function (char) {
        var str = '0123456789';
        if (str.indexOf(char) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    isLegalAccountPassword(account, password) {
        if (!account || !password || account.length === 0 || password.length === 0) {
            return false;
        }

        let charStarted = false;
        let hasChar = false;
        let hasNumber = false;

        if (password == null || password.length < 7) {
            console.log('密码位数<7');
            return false;
        }

        if (password.length > 32) {
            console.log('密码位数>32');
            return false;
        }

        if (password.indexOf(account) !== -1) {
            console.log('密码应该和账号无关');
            return false;
        }

        for (let i = 0; i < password.length; i++) {
            const char = password[i];

            if (i == 0) {
                if (this._isChar(char)) {
                    charStarted = true;
                    hasChar = true;
                }
            } else {
                if (this._isChar(char)) {
                    hasChar = true;
                } else if (this._isNumber(char)) {
                    hasNumber = true;
                } else {
                    console.log("密码含有非法字符");
                    return false;
                }
            }
        }

        if (charStarted && hasChar && hasNumber) {
            return true;
        } else {
            console.log("密码应该以字母开头,并且至少包含一个数字或者字母");
            return false;
        }
    }

    isLegalPhoneNumber(phoneNumber) {
        let regex = /^[1][23456789][0-9]{9}$/;
        return regex.test(phoneNumber);
    }

    isLegalVerifyCode(verifyCode) {
        let regex=/^\d{6}$/;
        return regex.test(verifyCode);
    }
}