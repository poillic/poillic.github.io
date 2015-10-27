function Question(_lvl, _nbProp){
	this.answerId = -1;
	this.nbProp = _nbProp || 4;
	this.propositions = [];
	this.lvl = _lvl || 1;
	this.generate();
}

Question.prototype = {
	generate : function(){
		var that = this;
		var allWords = Dictionary.filter( function(e){
			if(e.lvl == that.lvl)
				return e;
			else
				return;
		});

		for(var i = 0; i < this.nbProp; i++){
			this.propositions.push(allWords.splice(Math.random()*allWords.length|0, 1)[0]);
		}

		this.answerId = Math.round( Math.random() * this.propositions.length | 0 );
	},
	verify : function(_id){
		return _id == this.answerId;
	}
};