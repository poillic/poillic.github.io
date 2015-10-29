function Game() {
	this.score = 0;
	this.life = 5;
	this.lvl = 1;
	this.rowAnswer = 0;
	this.questions = [];
	this.nbProp = 2;
	this.currentQuestion = '';
	this.ui = {};
	this.rep = [];
	this.timer;
	this.init();
}

Game.prototype = {
	init: function() {
		if (debug)
			console.log("Game Init");

		addEventsCapabilities(this);

		this.score = 0;
		this.life = 5;
		this.ui = new UI();

		this.on('playerChoice', this.playerAnswer);
		this.on('restartGame', this.init);

		this.startGame();
		this.ui.UpdateScore({
			score: this.score,
			life: this.life
		});
	},
	startGame: function() {
		this.ui.showLetters(utils.getLettersByLvl(this.lvl));
		this.newQuestion();
	},
	newQuestion: function() {
		if (debug)
			console.log("= Game New Question");

		this.currentQuestion = new Question(this.lvl, this.nbProp);

		if (this.currentQuestion)
			this.questions.push(this.currentQuestion);

		this.rep = [];

		this.ui.displayQuestion(this.currentQuestion);
	},
	playerAnswer: function(_id, elt) {
		if (this.rep.indexOf(_id) != -1) {
			return;
		}
		this.rep.push(_id);
		if (this.currentQuestion.verify(_id)) {
			this.score++;
			this.rowAnswer++;
			var that = this;
			elt.className += " good";

			if( this.rowAnswer >= 5){
				if( this.nbProp < 4){
					this.nbProp++;
				}else{
					this.lvl++;
					this.nbProp = 2;
				}
				this.rowAnswer = 0;
			}


			this.timer = setTimeout(function() {
				that.newQuestion();
			}, 800);
		} else {
			this.rowAnswer = 0;
			elt.className += " bad";
			this.life--;
			if (this.life <= 0)
				this.ui.displayGameOver(this.score);
		}

		this.ui.UpdateScore({
			score: this.score,
			life: this.life
		});
	}
};