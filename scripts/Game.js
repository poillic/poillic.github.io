function Game() {
	this.score = 0;
	this.life = 5;
	this.questions = [];
	this.currentQuestion = '';
	this.ui = {};
	this.rep = [];

	this.init();
}

Game.prototype = {
	init: function() {
		if (debug)
			console.log("Game Init");

		addEventsCapabilities(this);
		
		this.ui = new UI();

		this.on('playerChoice', this.playerAnswer);
		this.newQuestion();
		this.ui.UpdateScore({
			score: this.score,
			life: this.life
		});
	},
	newQuestion: function() {
		if (debug)
			console.log("= Game New Question");

		this.currentQuestion = new Question(1, 4);

		if (this.currentQuestion)
			this.questions.push(this.currentQuestion);

		this.rep = [];
		this.ui.displayQuestion(this.currentQuestion);
	},
	playerAnswer: function(_id, elt) {
		console.log(this);
		if (this.rep.indexOf(_id) != -1) {
			return;
		}
		this.rep.push(_id);
		if (this.currentQuestion.verify(_id)) {
			this.score++;
			elt.className += " good";
			this.newQuestion();
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