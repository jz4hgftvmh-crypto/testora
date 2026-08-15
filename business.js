document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // BUSINESS & INVESTMENT
    // ==========================================

    const investment = document.getElementById("investment");
    const startupCost = document.getElementById("startupCost");
    const customers = document.getElementById("customers");
    const productPrice = document.getElementById("productPrice");
    const operatingCost = document.getElementById("operatingCost");
    const marketing = document.getElementById("marketing");


    // ==========================================
    // VALUE ELEMENTS
    // ==========================================

    const investmentValue = document.getElementById("investmentValue");
    const startupValue = document.getElementById("startupValue");
    const customersValue = document.getElementById("customersValue");
    const priceValue = document.getElementById("priceValue");
    const costValue = document.getElementById("costValue");
    const marketingValue = document.getElementById("marketingValue");


    // ==========================================
    // RESULT ELEMENTS
    // ==========================================

    const businessResult = document.getElementById("businessResult");
    const businessStatus = document.getElementById("businessStatus");
    const remainingCapital = document.getElementById("remainingCapital");
    const totalExpenses = document.getElementById("totalExpenses");


    // ==========================================
    // ANIMATION ELEMENTS
    // ==========================================

    const scene = document.querySelector(".business-scene");
    const building = document.querySelector(".business-building");
    const glow = document.querySelector(".business-glow");

    const customerElements =
        document.querySelectorAll(".business-customer");

    const moneyElements =
        document.querySelectorAll(".business-money");

    const coinElements =
        document.querySelectorAll(".business-coin");

    const graphLine =
        document.querySelector(".business-graph-line");

    const profitText =
        document.querySelector(".business-profit");


    // ==========================================
    // CHECK
    // ==========================================

    if (
        !investment ||
        !startupCost ||
        !customers ||
        !productPrice ||
        !operatingCost ||
        !marketing
    ) {
        return;
    }


    // ==========================================
    // HELPER
    // ==========================================

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }


    // ==========================================
    // UPDATE ANIMATION
    // ==========================================

    function updateBusinessAnimation(data) {

        const capital = data.capital;
        const startup = data.startupCost;
        const customerNumber = data.customers;
        const price = data.productPrice;
        const operating = data.operatingCost;
        const marketingBudget = data.marketing;

        const revenue = data.revenue;
        const expenses = data.expenses;
        const remaining = data.remainingCapital;
        const profit = data.profit;


        // ======================================
        // NORMALIZED VALUES
        // ======================================

        const capitalLevel = clamp(
            capital / 100000,
            0,
            1
        );

        const customerLevel = clamp(
            customerNumber / 2000,
            0,
            1
        );

        const priceLevel = clamp(
            price / 500,
            0,
            1
        );

        const marketingLevel = clamp(
            marketingBudget / 20000,
            0,
            1
        );

        const startupLevel = clamp(
            startup / 50000,
            0,
            1
        );

        const operatingLevel = clamp(
            operating / 30000,
            0,
            1
        );

        const profitLevel = clamp(
            profit / 100000,
            -1,
            1
        );

        const revenueLevel = clamp(
            revenue / 500000,
            0,
            1
        );


        // ======================================
        // 1. CAPITAL → BUILDING SIZE
        // ======================================

        if (building) {

            const buildingScale =
                0.82 +
                capitalLevel * 0.28;

            building.style.transform =
                "translateX(-50%) scale(" +
                buildingScale +
                ")";

            const buildingGlow =
                15 +
                capitalLevel * 45;

            building.style.boxShadow =
                "0 0 " +
                buildingGlow +
                "px rgba(130, 80, 230, 0.55), " +
                "inset 0 0 25px rgba(180, 130, 255, 0.15)";
        }


        // ======================================
        // 2. CUSTOMERS → CUSTOMER MOVEMENT
        // ======================================

        const customerActivity = clamp(
            customerLevel * 0.65 +
            marketingLevel * 0.35,
            0,
            1
        );

        const customerSpeed =
            4.5 -
            customerActivity * 3.2;

        customerElements.forEach(
            function (customer, index) {

                customer.style.animationDuration =
                    customerSpeed + "s";

                const customerScale =
                    0.65 +
                    customerLevel * 0.65;

                customer.style.transform =
                    "scale(" +
                    customerScale +
                    ")";

                customer.style.opacity =
                    0.35 +
                    customerActivity * 0.65;

                const spread =
                    130 +
                    customerLevel * 180;

                customer.style.marginLeft =
                    ((index - 1) * spread) + "px";
            }
        );


        // ======================================
        // 3. MARKETING → CUSTOMER ACTIVITY
        // ======================================

        customerElements.forEach(
            function (customer) {

                const marketingSpeed =
                    4 -
                    marketingLevel * 2;

                customer.style.animationDuration =
                    marketingSpeed + "s";
            }
        );


        // ======================================
        // 4. PRODUCT PRICE → MONEY
        // ======================================

        const moneySpeed =
            3.2 -
            priceLevel * 1.8;

        moneyElements.forEach(
            function (money) {

                money.style.animationDuration =
                    Math.max(
                        0.9,
                        moneySpeed
                    ) + "s";

                money.style.fontSize =
                    (17 + priceLevel * 12) +
                    "px";

                money.style.opacity =
                    0.35 +
                    priceLevel * 0.65;
            }
        );


        // ======================================
        // 5. REVENUE → MONEY FREQUENCY
        // ======================================

        const revenueSpeed =
            3 -
            revenueLevel * 1.8;

        moneyElements.forEach(
            function (money) {

                money.style.animationDuration =
                    Math.max(
                        0.8,
                        revenueSpeed
                    ) + "s";
            }
        );


        // ======================================
        // 6. PROFIT → COINS
        // ======================================

        const positiveProfit = clamp(
            profit / 50000,
            0,
            1
        );

        const negativeProfit = clamp(
            Math.abs(profit) / 50000,
            0,
            1
        );

        coinElements.forEach(
            function (coin) {

                if (profit > 0) {

                    coin.style.opacity =
                        0.25 +
                        positiveProfit * 0.75;

                    coin.style.transform =
                        "scale(" +
                        (
                            0.7 +
                            positiveProfit * 0.7
                        ) +
                        ")";

                    coin.style.animationDuration =
                        (
                            2.5 -
                            positiveProfit * 1.2
                        ) +
                        "s";

                }

                else if (profit < 0) {

                    coin.style.opacity =
                        0.25 -
                        negativeProfit * 0.18;

                    coin.style.transform =
                        "scale(0.55)";

                }

                else {

                    coin.style.opacity = "0.3";

                    coin.style.transform =
                        "scale(0.7)";
                }
            }
        );


        // ======================================
        // 7. STARTUP COST → BUILDING PRESSURE
        // ======================================

        if (building) {

            const startupPressure =
                startupLevel * 0.18;

            const scale =
                0.82 +
                capitalLevel * 0.28 -
                startupPressure;

            building.style.transform =
                "translateX(-50%) scale(" +
                Math.max(
                    0.65,
                    scale
                ) +
                ")";
        }


        // ======================================
        // 8. OPERATING COST → MONEY REDUCTION
        // ======================================

        const costPressure = clamp(
            operatingLevel * 0.65,
            0,
            0.65
        );

        moneyElements.forEach(
            function (money) {

                const moneyOpacity =
                    0.25 +
                    revenueLevel * 0.75 -
                    costPressure;

                money.style.opacity =
                    clamp(
                        moneyOpacity,
                        0.12,
                        1
                    );
            }
        );


        // ======================================
        // 9. REMAINING CAPITAL → GLOW
        // ======================================

        if (glow) {

            const capitalRemainingLevel =
                clamp(
                    remaining / 100000,
                    0,
                    1
                );

            if (remaining <= 0) {

                glow.style.opacity = "0.12";

            } else {

                glow.style.opacity =
                    0.25 +
                    capitalRemainingLevel * 0.75;
            }

            const glowSize =
                170 +
                capitalRemainingLevel * 100;

            glow.style.width =
                glowSize + "px";

            glow.style.height =
                (
                    55 +
                    capitalRemainingLevel * 35
                ) +
                "px";
        }


        // ======================================
        // 10. PROFIT → GRAPH
        // ======================================

        if (graphLine) {

            const graphRotation =
                -(profitLevel * 32);

            const graphScale =
                0.55 +
                clamp(
                    Math.abs(profitLevel),
                    0,
                    1
                ) * 0.55;

            graphLine.style.transform =
                "rotate(" +
                graphRotation +
                "deg) scaleX(" +
                graphScale +
                ")";

            if (profit > 0) {

                graphLine.style.opacity =
                    0.65 +
                    positiveProfit * 0.35;

            }

            else if (profit < 0) {

                graphLine.style.opacity = 0.3;

            }

            else {

                graphLine.style.opacity = 0.5;
            }
        }


        // ======================================
        // 11. PROFIT → PROFIT TEXT
        // ======================================

        if (profitText) {

            if (profit > 0) {

                const profitScale =
                    1 +
                    clamp(
                        profit / 100000,
                        0,
                        0.35
                    );

                profitText.style.transform =
                    "scale(" +
                    profitScale +
                    ")";

                profitText.style.opacity = "1";

            }

            else if (profit < 0) {

                profitText.style.transform =
                    "scale(0.78)";

                profitText.style.opacity = "0.35";

            }

            else {

                profitText.style.transform =
                    "scale(0.9)";

                profitText.style.opacity = "0.55";
            }
        }


        // ======================================
        // 12. OVERALL BUSINESS STATE
        // ======================================

        if (scene) {

            scene.classList.remove(
                "business-profitable",
                "business-loss",
                "business-warning"
            );

            if (remaining < 0) {

                scene.classList.add(
                    "business-warning"
                );

            }

            else if (profit > 0) {

                scene.classList.add(
                    "business-profitable"
                );

            }

            else if (profit < 0) {

                scene.classList.add(
                    "business-loss"
                );
            }
        }
    }


    // ==========================================
    // UPDATE BUSINESS
    // ==========================================

    function updateBusiness() {

        // --------------------------------------
        // GET VALUES
        // --------------------------------------

        const capital =
            Number(investment.value);

        const startup =
            Number(startupCost.value);

        const customerNumber =
            Number(customers.value);

        const price =
            Number(productPrice.value);

        const operating =
            Number(operatingCost.value);

        const marketingCost =
            Number(marketing.value);


        // --------------------------------------
        // UPDATE SLIDER NUMBERS
        // --------------------------------------

        investmentValue.textContent =
            "$" +
            capital.toLocaleString();

        startupValue.textContent =
            "$" +
            startup.toLocaleString();

        customersValue.textContent =
            customerNumber.toLocaleString();

        priceValue.textContent =
            "$" +
            price.toLocaleString();

        costValue.textContent =
            "$" +
            operating.toLocaleString();

        marketingValue.textContent =
            "$" +
            marketingCost.toLocaleString();


        // ======================================
        // REVENUE
        // ======================================

        const revenue =
            customerNumber *
            price;


        // ======================================
        // TOTAL EXPENSES
        // ======================================

        const expenses =
            startup +
            operating +
            marketingCost;

        totalExpenses.textContent =
            "$" +
            expenses.toLocaleString();


        // ======================================
        // REMAINING CAPITAL
        // ======================================

        const remaining =
            capital -
            expenses;

        remainingCapital.textContent =
            "$" +
            remaining.toLocaleString();


        // ======================================
        // PROFIT
        // ======================================
        //
        // IMPORTANT:
        // Startup Cost is included here.
        //
        // Profit =
        // Revenue
        // - Startup Cost
        // - Operating Cost
        // - Marketing Budget
        //
        // ======================================

        const profit =
            revenue -
            startup -
            operating -
            marketingCost;


        businessResult.textContent =
            "$" +
            profit.toLocaleString();


        // ======================================
        // PROJECT STATUS
        // ======================================

        if (remaining < 0) {

            businessStatus.textContent =
                "⚠ Insufficient capital to cover the project costs.";

        }

        else if (profit > 0) {

            businessStatus.textContent =
                "✓ The project is generating an operating profit.";

        }

        else if (profit === 0) {

            businessStatus.textContent =
                "The project is currently breaking even.";

        }

        else {

            businessStatus.textContent =
                "The project is currently operating at a loss.";
        }


        // ======================================
        // BUSINESS DATA
        // ======================================

        window.businessData = {

            capital: capital,

            startupCost: startup,

            customers: customerNumber,

            productPrice: price,

            operatingCost: operating,

            marketing: marketingCost,

            revenue: revenue,

            expenses: expenses,

            remainingCapital: remaining,

            profit: profit
        };


        // ======================================
        // UPDATE ANIMATION
        // ======================================

        updateBusinessAnimation(
            window.businessData
        );


        // ======================================
        // SEND EVENT
        // ======================================

        document.dispatchEvent(
            new CustomEvent(
                "businessUpdated",
                {
                    detail:
                        window.businessData
                }
            )
        );
    }


    // ==========================================
    // SLIDER EVENTS
    // ==========================================

    investment.addEventListener(
        "input",
        updateBusiness
    );

    startupCost.addEventListener(
        "input",
        updateBusiness
    );

    customers.addEventListener(
        "input",
        updateBusiness
    );

    productPrice.addEventListener(
        "input",
        updateBusiness
    );

    operatingCost.addEventListener(
        "input",
        updateBusiness
    );

    marketing.addEventListener(
        "input",
        updateBusiness
    );


    // ==========================================
    // INITIAL UPDATE
    // ==========================================

    updateBusiness();

});