$(document).ready(function(){

$("#calculateButton").prop("disabled", true); //Sets button to disabled at page load

$('#balanceInput').focus(); //Sets the balance to selected on page load

	
	$('#balanceInput').keyup(function() { //Sets a dollar sign to beginning of balance field

	   $(this).val(function(i,v) {
	     return '$' + v.replace('$','');
	   });

	 });


	$("input").keyup(function(){ //Checks to see when the fields are all populated

		var findIfZero =  $("#balanceInput").val().split("$").pop().length * $("#rateInput").val().length * $("#termInput").val().length;
		if (findIfZero > 0) {
			$("#calculateButton").prop("disabled", false);
		}
		else
		{ //If All of the fields are populated, enable the calculate button
			$("#calculateButton").prop("disabled", true);
		}
	});


	$("#calculateButton").click(function(click){ //Button function to do calculation

		this.blur();

		var loanBalance = $("#balanceInput").val().split("$").pop();
		var interestRate = $("#rateInput").val();
		var loanTerm = $("#termInput").val();
		var periodValue = $("#periodSelect").val();
		var findIfZero = loanBalance * interestRate * loanTerm;

		if (findIfZero == 0) { //If there are valid numbers in the fields
			alert("Make sure you have entered valid numbers.");
		} 
		else
		{
			if (!$.isNumeric(loanBalance)) { //If you have entered a letter in the loan balance field
				alert("Please check that you have entered a valid Loan Balance.");
				$("#loan").addClass("has-error");
			} 
			else
			{ //If your percentage is above 100%
				$("#loan").removeClass("has-error");
				if (interestRate>100) {
					alert("Your interest rate percentage is too high.");
					$("#rate").addClass("has-error");
				} 
				else
				{ //If your loan term years are too high
					$("#rate").removeClass("has-error");
					if (loanTerm > 1343) {
						alert("Your loan term years must be between 1-1343.");
					$("#term").addClass("has-error");
					}
					else
					{ //If everything is ok it will run the function
						$("#term").removeClass("has-error");
						var numberOfPayments = loanTerm * periodValue;
						var monthlyInterestRate = (interestRate / 100)/periodValue;
						var compoundedIntestRate = Math.pow((1+monthlyInterestRate),numberOfPayments);
						var interestQuotient = (monthlyInterestRate * compoundedIntestRate) / (compoundedIntestRate - 1);
						var monthlyPayment = (loanBalance * interestQuotient);
						
						$("#expectedOutput").text("Your monthly payment: $" + monthlyPayment.toFixed(2));
					}
				}
			}
		}
	});
		
});
