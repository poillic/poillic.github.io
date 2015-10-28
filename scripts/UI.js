function UI() {
	this.alphabet = {};
	this.game = {};
	this.question = document.querySelector('#question');
	this.main = document.querySelector('#question .main');
	this.answers = document.querySelector('#question .answers');
	this.life = document.querySelector('#data .life');
	this.score = document.querySelector('#data .score');

	this.playButton = document.querySelector('#home button.play');

	this.game.question = document.querySelector('#question');
	this.game.data = document.querySelector('#game #data');
	this.game.gameOver = document.querySelector('#game .gameOver');
	this.game.replay = document.querySelector('#game button.replay');
	this.game.newLetter = document.querySelector('#game div#newLetter');
	this.alphaButton = document.querySelector('#home button.alphabet');
	this.alphabet.backButton = document.querySelector('#alphabet button.back');

	this.alphabetSection = document.querySelector('section#alphabet');
	this.homeSection = document.querySelector('section#home');
	this.gameSection = document.querySelector('section#game');

	var that = this;

	this.game.replay.addEventListener('click', function(e) {
		that.hideHome();
		that.displayGame();
		game.emit('restartGame');
	});
	this.alphabet.backButton.addEventListener('click', function(e) {
		that.hideAlphabet();
		that.displayHome();
		game.emit('restartGame');
	});
	this.game.newLetter.addEventListener('click', function(e){
		that.hide(that.game.newLetter);
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
	hide: function(DOMelt) {
		DOMelt.style.display = "none";
	},
	show: function(DOMelt, displayType) {
		DOMelt.style.display = displayType || "block";
	},
	showLetters: function(letters) {
		this.game.newLetter.innerHTML = "";
		var div = document.createElement('div');
		for(var i = 0; i < letters.length; i++){
			var s = document.createElement('span');
			s.textContent = letters[i].fr + " = " + letters[i].kanji;
			div.appendChild(s);
		}
		this.game.newLetter.appendChild(div);
		this.show(this.game.newLetter, "flex");
	},
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
		this.hide(this.alphabetSection);
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
		this.show(this.homeSection);
	},
	hideHome: function() {
		this.hide(this.homeSection);
	},
	displayGame: function() {
		this.show(this.game.data);
		this.show(this.game.question);
		this.show(this.gameSection);
		this.hide(this.game.gameOver);
	},
	UpdateScore: function(data) {
		this.life.textContent = data.life;
		this.score.textContent = data.score;
	},
	displayGameOver: function(_score) {
		document.querySelector('.gameOver .score').textContent = _score;
		this.show(this.game.gameOver);
		this.hide(this.game.data);
		this.hide(this.question);
	}
}