$(document).ready(function () {
    $("#display").click(function () {
        
        $(".error").text("");

        let baseCurrency = $("#basecurrency").val();
        let convertCurrency = $("#convertcurrency").val();
        let fromDate = $("#fromdate").val();
        let toDate = $("#todate").val();
        let isValid = true;

      
        if (!baseCurrency) {
            $("#basecurrencyMsg").text("Base currency is required.");
            
            isValid = false;
        }
      
        if (!convertCurrency) {
            $("#convertcurrencyMsg").text("Convert currency is required.");
            isValid = false;
        }
        if (!fromDate) {
            $("#fromdateMsg").text("From date is required.");
            isValid = false;
        }
        if (!toDate) {
            $("#todateMsg").text("To date is required.");
            isValid = false;
        }

        
        if (fromDate && toDate && new Date(toDate) <= new Date(fromDate)) {
            $("#todateMsg").text("To Date must be after From Date.");
            isValid = false;
        }

        if (!isValid) return; 
        if (baseCurrency === convertCurrency) {
            $("#basecurrencyMsg").text("From and To currencies must be different.");
            return;
        }
       
        let apiKey = "RaBjYHqJ7DHONHdJgUhlaw8mchoe1NJG"; 

       
        let apiUrl = `https://api.polygon.io/v2/aggs/ticker/C:${baseCurrency}${convertCurrency}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${apiKey}`;

        
        $.getJSON(apiUrl, function (data) {
            if (data.results && data.results.length > 0) {
                let labels = [];
                let rates = [];

                
                data.results.forEach((item) => {
                    let date = new Date(item.t).toISOString().split("T")[0];
                    labels.push(date);
                    rates.push(item.c); 
                });

               
                drawChart(labels, rates, baseCurrency, convertCurrency);
            } else {
                alert("No data found for the selected range.");
            }
        }).fail(function () {
            alert("Error fetching data. Check your API key and network connection.");
        });
    });

   
    function drawChart(labels, rates, base, convert) {
        let ctx = document.getElementById("chartjs-0").getContext("2d");

       
        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Exchange Rate (${base} to ${convert})`,
                        data: rates,
                        borderColor: "indigo",
                        backgroundColor: "rgba(227, 38, 227, 0.37)",
                        borderWidth: 2,
                       
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio:false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Date",
        
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Rate",
                        },
                    },
                },
            },
        });
    }

   
    $("#clear").click(function () {
        $("#myform")[0].reset();
        $(".error").text("");
        if (window.myChart) {
            window.myChart.destroy();
        }
    });
});