export const timeConversion = (milliseconds) => {
	const sec = Math.floor( milliseconds / 1000 );
	const min = Math.floor( sec / 60 );

	return min;
};