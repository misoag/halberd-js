define(function(require, exports, module){
/**!phpjs;module:datetime
 */
exports.strtotime = function strtotime (text, now) {
	// Convert string representation of date and time to a timestamp
	//
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/strtotime
	// +   original by: Caio Ariede (http://caioariede.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +      input by: David
	// +   improved by: Caio Ariede (http://caioariede.com)
	// +   improved by: Brett Zamir (http://brett-zamir.me)
	// +   bugfixed by: Wagner B. Soares
	// +   bugfixed by: Artur Tchernychev
	// +   improved by: A. Matías Quezada (http://amatiasq.com)
	// %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
	// *     example 1: strtotime('+1 day', 1129633200);
	// *     returns 1: 1129719600
	// *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
	// *     returns 2: 1130425202
	// *     example 3: strtotime('last month', 1129633200);
	// *     returns 3: 1127041200
	// *     example 4: strtotime('2009-05-04 08:30:00');
	// *     returns 4: 1241418600
	if (!text)
		return null;

	// Unecessary spaces
	text = text.trim()
		.replace(/\s{2,}/g, ' ')
		.replace(/[\t\r\n]/g, '')
		.toLowerCase();

	var parsed;

	if (text === 'now')
		return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
	else if (!isNaN(parse = Date.parse(text)))
		return parse / 1000 | 0;
	if (text == 'now')
		return new Date().getTime() / 1000; // Return seconds, not milli-seconds
	else if (!isNaN(parsed = Date.parse(text)))
		return parsed / 1000;

	var match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
	if (match) {
		var year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
		return new Date(year, parseInt(match[2], 10) - 1, match[3],
			match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
	}

	var date = now ? new Date(now * 1000) : new Date();
	var days = {
		'sun': 0,
		'mon': 1,
		'tue': 2,
		'wed': 3,
		'thu': 4,
		'fri': 5,
		'sat': 6
	};
	var ranges = {
		'yea': 'FullYear',
		'mon': 'Month',
		'day': 'Date',
		'hou': 'Hours',
		'min': 'Minutes',
		'sec': 'Seconds'
	};

	function lastNext(type, range, modifier) {
		var day = days[range];

		if (typeof(day) !== 'undefined') {
			var diff = day - date.getDay();

			if (diff === 0)
				diff = 7 * modifier;
			else if (diff > 0 && type === 'last')
				diff -= 7;
			else if (diff < 0 && type === 'next')
				diff += 7;

			date.setDate(date.getDate() + diff);
		}
	}
	function process(val) {
		var split = val.split(' ');
		var type = split[0];
		var range = split[1].substring(0, 3);
		var typeIsNumber = /\d+/.test(type);

		var ago = split[2] === 'ago';
		var num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

		if (typeIsNumber)
			num *= parseInt(type, 10);

		if (ranges.hasOwnProperty(range))
			return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
		else if (range === 'wee')
			return date.setDate(date.getDate() + (num * 7));

		if (type === 'next' || type === 'last')
			lastNext(type, range, num);
		else if (!typeIsNumber)
			return false;

		return true;
	}

	var regex = '([+-]?\\d+\\s' +
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)|(last|next)\\s' +
		'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' +
		'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' +
		'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))(\\sago)?';

	match = text.match(new RegExp(regex, 'gi'));
	if (!match)
		return false;

	for (var i = 0, len = match.length; i < len; i++)
		if (!process(match[i]))
			return false;

	// ECMAScript 5 only
	//if (!match.every(process))
	//	return false;

	return (date.getTime() / 1000);
};// Fork from https://github.com/kvz/phpjs
});