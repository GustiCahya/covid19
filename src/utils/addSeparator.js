export default function addSeparator(num){
	num = Number(num);
	num = Math.round(num);
	return (num).toLocaleString("id", {
		minimumFractionDigits: 2,
  		maximumFractionDigits: 2
	}).replace(/,\d\d/g, "") || null;
}