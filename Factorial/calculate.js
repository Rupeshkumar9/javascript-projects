function factorialIterative(Number)
{

    let fact = 1;
	if (Number == "")
	{
		return "No Input";
	}

	else if (Number < 0)
	{
		return "Factorial is not defined for negative numbers";
	}
	
    for (let i=1; i<=Number; i++)
    {
        fact = fact*i;

    }

    return fact;
}


		
function getvalue()
	{


		let value = document.getElementById("numberInput").value;
		let  result = factorialIterative(value);    // calling the fuction function factorialIterative()
		document.getElementById("output").textContent = "Factorial: " + result;
		

	}


		// Display the message & Ask the user Input(In Pop Screen of browser) -
		// const Number = prompt("Please enter the Number: ");  

		// Display the message in the pop Up screen in browser -
		// alert(result);  























