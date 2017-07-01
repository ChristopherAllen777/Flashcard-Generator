exports.ClozeCard = function(text, cloze) {
	this.full = text; // Contains full text
	this.cloze = cloze; // Contains the answer
	blank = "";
	for (var i = 0; i < cloze.length; i++) {
            blank += "_ " + "";
	};
	this.partial = text.replace(cloze, " " + blank);
}

