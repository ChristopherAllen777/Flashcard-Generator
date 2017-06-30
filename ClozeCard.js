exports.ClozeCard = function(text, cloze) {
	var textToLower = text.toLowerCase();
	var clozeToLower = cloze.toLowerCase();
	this.full = text;
	this.cloze = cloze;
	blank = "";
	for (var i = 0; i < cloze.length; i++) {
            blank += "_ " + "";
	};
	this.partial = text.replace(cloze, " " + blank);
}