function only (words) {
  return new RegExp('\\b(?:' + String(words).match(/\w+/g).join('|') + ')\\b')
}

Prism.languages.pathify = Prism.languages.extend('javascript',  {
  'construct' : only('var|const|function|default|extends|implements|import|interface|internal|package|private|protected|public|use|dynamic|final|include|namespace|override|static'),
  'pathify'   : only('get|set|sync'),
  'method'    : only('mutations|actions|getters'),
	'keyword'   : only('as|break|case|catch|class|delete|do|else|finally|for|if|in|instanceof|is|native|new|null|return|super|switch|this|throw|try|typeof|void|while|with|each'),
	'operator'  : /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
});
Prism.languages.pathify['class-name'].alias = 'function';

if (Prism.languages.markup) {
	Prism.languages.insertBefore('pathify', 'string', {
		'xml': {
			pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
			lookbehind: true,
			inside: {
				rest: Prism.languages.markup
			}
		}
	});
}
