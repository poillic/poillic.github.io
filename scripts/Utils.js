function Utils(){};

Utils.prototype = {
	getLettersByLvl: function(_lvl) {
		var res = [];
		for (var i = 0; i < Dictionary.length; i++) {
			if (Dictionary[i].lvl == _lvl)
				res.push(Dictionary[i]);
		}
		return res;
	}
}

var utils = new Utils();