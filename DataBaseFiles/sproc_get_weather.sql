/*
	Author: Kieran Zylstra
	Date-Created: 3/17/20
	Last-Updated: 3/20/20
*/


SELECT * FROM Daily_Weather
WHERE to_date(day, 'dd-mm-yy') = to_date(now(), 'dd-mm-yy')
;
