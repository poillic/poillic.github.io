function Game() {
	this.score = 0;
	this.life = 5;
	this.lvl = 2;
	this.questions = [];
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

		this.currentQuestion = new Question(this.lvl, 4);

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
			var that = this;
			elt.className += " good";
			this.timer = setTimeout(function() {
				that.newQuestion();
			}, 800);
		} else {
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