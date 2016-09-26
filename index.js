


$(document).ready(function(){

$("#calculateButton").prop("disabled", true);

$('#balanceInput').keyup(function() {
   $(this).val(function(i,v) {
     return '$' + v.replace('$','');
   });
 });

$("input").keyup(function(){

	var findIfZero =  $("#balanceInput").val().split("$").pop().length * $("#rateInput").val().length * $("#termInput").val().length;
	if (findIfZero > 0) {
		$("#calculateButton").prop("disabled", false);
	}
	else
	{
		$("#calculateButton").prop("disabled", true);
	}
});


	$("#calculateButton").click(function(click){

		this.blur();

		var loanBalance = $("#balanceInput").val().split("$").pop();
		var interestRate = $("#rateInput").val();
		var loanTerm = $("#termInput").val();
		var periodValue = $("#periodSelect").val();
		var findIfZero = loanBalance * interestRate * loanTerm;

		if (findIfZero == 0) {
			alert("Make sure all of the fields are filled in.");
		} 
		else
		{
			if (!$.isNumeric(loanBalance)) {
				alert("Please check that you have entered a valid Loan Balance.");
			} 
			else
			{
				if (interestRate>100) {
					alert("Your interest rate percentage is too high.");
				} 
				else
				{
					var numberOfPayments = loanTerm * periodValue;
					var monthlyInterestRate = (interestRate / 100)/periodValue;
					var compoundedIntestRate = Math.pow((1+monthlyInterestRate),numberOfPayments);
					var interestQuotient = (monthlyInterestRate * compoundedIntestRate) / (compoundedIntestRate - 1);
					var monthlyPayment = (loanBalance * interestQuotient);
					$("#expectedOutput").text("Your monthly payment: $" + monthlyPayment.toFixed(2));
				}
			}
		}
	});
		

});














