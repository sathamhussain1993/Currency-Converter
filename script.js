// Fetches supported currencies from the ExchangeRate-API
function fetchCurrencies() {
    var apiKey = 'YOUR_API_KEY'; // Replace with your ExchangeRate-API key
    var url = 'https://api.exchangerate-api.com/v4/latest/INR';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var currencies = Object.keys(data.rates);
            var fromCurrencySelect = document.getElementById('from_currency');
            var toCurrencySelect = document.getElementById('to_currency');

            currencies.forEach(function (currency) {
                var option = document.createElement('option');
                option.text = currency;
                option.value = currency;
                fromCurrencySelect.add(option);

                option = document.createElement('option');
                option.text = currency;
                option.value = currency;
                toCurrencySelect.add(option);
            });

            // Add event listener to amount input field
            var amountInput = document.getElementById('amount');
            amountInput.addEventListener('input', convertCurrency);
        })
        .catch(function (error) {
            console.log('Failed to fetch currency rates: ' + error);
        });
}

// Converts the currency based on user input
function convertCurrency() {
    var amount = document.getElementById('amount').value;
    var fromCurrency = document.getElementById('from_currency').value;
    var toCurrency = document.getElementById('to_currency').value;

    // Make an API call to fetch exchange rates
    var apiKey = 'YOUR_API_KEY'; // Replace with your ExchangeRate-API key
    var url = 'https://api.exchangerate-api.com/v4/latest/' + fromCurrency;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.rates[toCurrency]) {
                var rate = data.rates[toCurrency];
                var convertedAmount = amount * rate;
                var symbol = getCurrencySymbol(toCurrency);
                var formattedAmount = symbol + ' ' + convertedAmount.toFixed(2);
                document.getElementById('converted_amount').textContent = formattedAmount;
            } else {
                console.log('Failed to fetch exchange rates');
            }
        })
        .catch(function (error) {
            console.log('Failed to fetch exchange rates: ' + error);
        });
}

// Swaps the "From Currency" and "To Currency" selections
function swapCurrencies() {
    var fromCurrencySelect = document.getElementById('from_currency');
    var toCurrencySelect = document.getElementById('to_currency');

    var temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;

    // Trigger currency conversion after swapping
    convertCurrency();
}

// Retrieves the currency symbol for the given currency code
function getCurrencySymbol(currencyCode) {
    var currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CNY: '¥',
        INR: '₹',
        // Add more currency symbols as needed
    };

    return currencySymbols[currencyCode] || currencyCode;
}

// Fetch currencies when the page loads
fetchCurrencies();
