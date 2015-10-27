function UI() {
	this.alphabet = {};
	this.game = {};
	this.q = document.querySelector('#question');
	this.main = document.querySelector('#question .main');
	this.answers = document.querySelector('#question .answers');
	this.life = document.querySelector('#data .life');
	this.score = document.querySelector('#data .score');

	this.playButton = document.querySelector('#home button.play');

	this.game.question = document.querySelector('#question');
	this.game.data = document.querySelector('#game #data');
	this.game.gameOver = document.querySelector('#game .gameOver');
	this.game.replay = document.querySelector('#game button.replay');

	this.alphaButton = document.querySelector('#home button.alphabet');
	this.alphabet.backButton = document.querySelector('#alphabet button.back');
	
	this.alphabetSection = document.querySelector('section#alphabet');
	this.homeSection = document.querySelector('section#home');
	this.gameSection = document.querySelector('section#game');

	var that = this;

	this.game.replay.addEventListener('click', function(e){
		that.hideHome();
		that.displayGame();
		game.emit('restartGame');
	});
	this.alphabet.backButton.addEventListener('click', function(e) {
		that.hideAlphabet();
		that.displayHome();
		game.emit('restartGame');
	});
	this.playButton.addEventListener('click', function(e) {
		that.hideHome();
		that.displayGame();
	});
	this.alphaButton.addEventListener('click', function(e) {
		that.displayAlphabet();
	});
}

UI.prototype = {
	displayAlphabet: function() {
		document.querySelector('#alphabet').style.display = "block";
		document.querySelector('#home').style.display = "none";
		if (this.alphabet.shown)
			return;

		this.alphabet.shown = true;

		for (var i = 1; i < 5; i++) {
			var div = document.createElement('div');
			div.textContent = "Lvl " + i;

			for (e in Dictionary) {
				if (Dictionary[e].lvl != i) {
					continue;
				}

				var fr = document.createElement('span');
				fr.className = 'fr';
				var kanji = document.createElement('span');
				kanji.className = 'kanji';

				fr.textContent = Dictionary[e].fr;
				kanji.textContent = Dictionary[e].kanji;
				div.appendChild(kanji);
				div.appendChild(fr);
				document.querySelector('#alphabet').appendChild(div);
			}
		}
	},
	hideAlphabet: function() {
		this.alphabetSection.style.display = "none";
	},
	displayQuestion: function(_question) {

		if (debug)
			console.log("== UI Display Question");

		this.main.textContent = _question.propositions[_question.answerId].kanji;
		this.answers.textContent = "";
		for (var i = 0; i < _question.propositions.length; i++) {
			var span = document.createElement('span');
			span.className = "prop";
			span.id = "p" + i;
			span.textContent = _question.propositions[i].fr;

			span.addEventListener('click', function(e) {
				game.emit('playerChoice', e.target.id.slice(1), e.target);
			});

			this.answers.appendChild(span);
		}
	},
	displayHome: function() {
		this.homeSection.style.display = "block";
	},
	hideHome: function(){
		this.homeSection.style.display = "none";
	},
	displayGame: function() {
		this.game.data.style.display = "block";
		this.game.question.style.display = "block";
		this.game.gameOver.style.display = "none";
		this.gameSection.style.display = "block";
	},
	UpdateScore: function(data) {
		this.life.textContent = data.life;
		this.score.textContent = data.score;
	},
	displayGameOver: function(_score) {
		document.querySelector('.gameOver .score').textContent = _score;
		this.game.data.style.display = "none";
		document.querySelector('#question').style.display = "none";
		this.game.gameOver.style.display = "block";
	}
}