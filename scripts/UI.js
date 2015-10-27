function UI(){
	this.q = document.querySelector('#question');
	this.main = document.querySelector('#question .main');
	this.answers = document.querySelector('#question .answers');
	this.life = document.querySelector('#data .life');
	this.score = document.querySelector('#data .score');

	this.playButton = document.querySelector('#home button.play');
	this.restartButton = document.querySelector('#game button.replay');
	this.alphaButton = document.querySelector('#home button.alphabet');

	this.homeSection = document.querySelector('section#home');
	this.gameSection = document.querySelector('section#game');
	var that = this;
	this.playButton.addEventListener('click', function(e){
		that.displayGame();
	});
	this.alphaButton.addEventListener('click', function(e){
		that.displayAlphabet();
	});
	this.restartButton.addEventListener('click', function(e){
		app.emit('restartGame');
	});
}

UI.prototype = {
	displayAlphabet: function(){
		for(var i = 1; i < 4; i++){
			var div = document.createElement('div');
			div.textContent = "Lvl " + i;
		
			for(e in Dictionary){
				if( Dictionary[e].lvl != i ){
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
				document.querySelector('#alphabet').style.display = "block";
				document.querySelector('#home').style.display = "none";
			}
		}
	},
	displayQuestion : function(_question){
		if(debug)
			console.log("== UI Display Question");

		this.main.textContent = _question.propositions[ _question.answerId ].kanji;
		this.answers.textContent = "";
		for(var i = 0; i < _question.propositions.length; i++){
			var span = document.createElement('span');
			span.className = "prop";
			span.id = "p" + i;
			span.textContent = _question.propositions[i].fr;

			span.addEventListener('click', function(e){
				game.emit('playerChoice', e.target.id.slice(1), e.target);
			});

			this.answers.appendChild(span);
		}
	},
	displayGame: function(){
		this.homeSection.style.display = "none";
		this.gameSection.style.display = "block";
	},
	UpdateScore: function(data){
		this.life.textContent = data.life;
		this.score.textContent = data.score;
	},
	displayGameOver : function(_score){
		document.querySelector('.gameOver .score').textContent = _score;
		document.querySelector('#data').style.display = "none";
		document.querySelector('#question').style.display = "none";
		document.querySelector('.gameOver').style.display = "block";
	}
}