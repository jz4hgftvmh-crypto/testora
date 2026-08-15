document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // EXPERIMENT BUTTONS
    // ==========================================

    const buttons =
        document.querySelectorAll(".experiment-button");

    const experiments =
        document.querySelectorAll(".experiment-content");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const experimentName =
                button.dataset.experiment;


            // Remove active from all buttons

            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            // Activate selected button

            button.classList.add("active");


            // Hide all experiments

            experiments.forEach(function (experiment) {
                experiment.classList.remove("active");
            });


            // Show selected experiment

            const selectedExperiment =
                document.getElementById(experimentName);


            if (selectedExperiment) {
                selectedExperiment.classList.add("active");
            }

        });

    });



    // ========================================== 
    // PHYSICS EXPERIMENT 
    // ========================================== 

    const force = document.getElementById("force");
    const mass = document.getElementById("mass");
    const angle = document.getElementById("angle");
    const length = document.getElementById("length");
    const gravity = document.getElementById("gravity");
    const damping = document.getElementById("damping");

    const forceValue = document.getElementById("forceValue");
    const massValue = document.getElementById("massValue");
    const angleValue = document.getElementById("angleValue");
    const lengthValue = document.getElementById("lengthValue");
    const gravityValue = document.getElementById("gravityValue");
    const dampingValue = document.getElementById("dampingValue");

    const physicsResult = document.getElementById("physicsResult");


    function updatePhysics() {

        if (!force || !mass || !angle || !length) {
            return;
        }

        const F = Number(force.value);
        const M = Number(mass.value);
        const A = Number(angle.value);
        const L = Number(length.value);

        const G = gravity ? Number(gravity.value) : 9.81;
        const D = damping ? Number(damping.value) : 10;


        // VALUES 

        if (forceValue) {
            forceValue.textContent = F + " N";
        }

        if (massValue) {
            massValue.textContent = M + " kg";
        }

        if (angleValue) {
            angleValue.textContent = A + "°";
        }

        if (lengthValue) {
            lengthValue.textContent = L.toFixed(1) + " m";
        }

        if (gravityValue) {
            gravityValue.textContent = G.toFixed(2) + " m/s²";
        }

        if (dampingValue) {
            dampingValue.textContent = D + "%";
        }


        // CALCULATION 

        const forceAcceleration = F / M;

        const gravityEffect = G / 9.81;

        const angleEffect =
            Math.sin(A * Math.PI / 180);

        const lengthEffect =
            Math.sqrt(2 / L);

        const dampingEffect =
            1 - (D / 100);


        const result =
            forceAcceleration *
            gravityEffect *
            (0.5 + angleEffect) *
            lengthEffect *
            dampingEffect;


        if (physicsResult) {
            physicsResult.textContent =
                result.toFixed(2) + " m/s²";
        }


        // SEND DATA TO ANIMATION 

        window.physicsData = {
            force: F,
            mass: M,
            angle: A,
            length: L,
            gravity: G,
            damping: D,
            result: result
        };


        document.dispatchEvent(
            new CustomEvent("physicsUpdated", {
                detail: window.physicsData
            })
        );

    }


    // PHYSICS EVENTS 

    if (force) {
        force.addEventListener("input", updatePhysics);
    }

    if (mass) {
        mass.addEventListener("input", updatePhysics);
    }

    if (angle) {
        angle.addEventListener("input", updatePhysics);
    }

    if (length) {
        length.addEventListener("input", updatePhysics);
    }

    if (gravity) {
        gravity.addEventListener("input", updatePhysics);
    }

    if (damping) {
        damping.addEventListener("input", updatePhysics);
    }


    // ==========================================
    // WATER FILTRATION
    // ==========================================

    const filter =
        document.getElementById("filter");

    const waterSpeed =
        document.getElementById("waterSpeed");

    const contamination =
        document.getElementById("contamination");

    const layers =
        document.getElementById("layers");


    const filterValue =
        document.getElementById("filterValue");

    const waterSpeedValue =
        document.getElementById("waterSpeedValue");

    const contaminationValue =
        document.getElementById("contaminationValue");

    const layersValue =
        document.getElementById("layersValue");


    const waterResult =
        document.getElementById("waterResult");



    function updateWater() {

        if (
            !filter ||
            !waterSpeed ||
            !contamination ||
            !layers
        ) {
            return;
        }


        const filterNumber =
            Number(filter.value);

        const speedNumber =
            Number(waterSpeed.value);

        const contaminationNumber =
            Number(contamination.value);

        const layersNumber =
            Number(layers.value);



        filterValue.textContent =
            filterNumber + "%";


        waterSpeedValue.textContent =
            speedNumber + "%";


        contaminationValue.textContent =
            contaminationNumber + "%";


        layersValue.textContent =
            layersNumber;



        let quality =
            50
            + filterNumber * 0.25
            + layersNumber * 5
            - speedNumber * 0.12
            - contaminationNumber * 0.30;


        quality =
            Math.max(
                0,
                Math.min(
                    100,
                    quality
                )
            );


        waterResult.textContent =
            Math.round(quality) + "%";


        window.waterData = {

            filter:
                filterNumber,

            waterSpeed:
                speedNumber,

            contamination:
                contaminationNumber,

            layers:
                layersNumber,

            quality:
                quality

        };


        document.dispatchEvent(
            new CustomEvent(
                "waterUpdated",
                {
                    detail:
                        window.waterData
                }
            )
        );

    }



    if (filter) {
        filter.addEventListener(
            "input",
            updateWater
        );
    }


    if (waterSpeed) {
        waterSpeed.addEventListener(
            "input",
            updateWater
        );
    }


    if (contamination) {
        contamination.addEventListener(
            "input",
            updateWater
        );
    }


    if (layers) {
        layers.addEventListener(
            "input",
            updateWater
        );
    }



    // ==========================================
    // SOLAR ENERGY
    // ==========================================

    const sunlight =
        document.getElementById("sunlight");

    const panelAngle =
        document.getElementById("panelAngle");

    const efficiency =
        document.getElementById("efficiency");

    const sunHours =
        document.getElementById("sunHours");


    const sunlightValue =
        document.getElementById("sunlightValue");

    const panelAngleValue =
        document.getElementById("panelAngleValue");

    const efficiencyValue =
        document.getElementById("efficiencyValue");

    const sunHoursValue =
        document.getElementById("sunHoursValue");


    const solarResult =
        document.getElementById("solarResult");



    function updateSolar() {

        if (
            !sunlight ||
            !panelAngle ||
            !efficiency ||
            !sunHours
        ) {
            return;
        }


        const sunlightNumber =
            Number(sunlight.value);

        const angleNumber =
            Number(panelAngle.value);

        const efficiencyNumber =
            Number(efficiency.value);

        const hoursNumber =
            Number(sunHours.value);



        sunlightValue.textContent =
            sunlightNumber + "%";


        panelAngleValue.textContent =
            angleNumber + "°";


        efficiencyValue.textContent =
            efficiencyNumber + "%";


        sunHoursValue.textContent =
            hoursNumber + " h";



        const angleEffect =
            Math.cos(
                Math.abs(
                    angleNumber - 45
                ) *
                Math.PI /
                180
            );


        let output =
            sunlightNumber
            *
            (efficiencyNumber / 20)
            *
            hoursNumber
            *
            angleEffect
            *
            0.6;


        output =
            Math.max(
                0,
                output
            );


        solarResult.textContent =
            Math.round(output) +
            " units";



        window.solarData = {

            sunlight:
                sunlightNumber,

            panelAngle:
                angleNumber,

            efficiency:
                efficiencyNumber,

            sunHours:
                hoursNumber,

            output:
                output

        };


        document.dispatchEvent(
            new CustomEvent(
                "solarUpdated",
                {
                    detail:
                        window.solarData
                }
            )
        );

    }



    if (sunlight) {
        sunlight.addEventListener(
            "input",
            updateSolar
        );
    }


    if (panelAngle) {
        panelAngle.addEventListener(
            "input",
            updateSolar
        );
    }


    if (efficiency) {
        efficiency.addEventListener(
            "input",
            updateSolar
        );
    }


    if (sunHours) {
        sunHours.addEventListener(
            "input",
            updateSolar
        );
    }



    // ==========================================
    // BUSINESS & INVESTMENT
    // ==========================================

    const investment =
        document.getElementById("investment");

    const startupCost =
        document.getElementById("startupCost");

    const customers =
        document.getElementById("customers");

    const productPrice =
        document.getElementById("productPrice");

    const operatingCost =
        document.getElementById("operatingCost");

    const marketing =
        document.getElementById("marketing");


    const investmentValue =
        document.getElementById("investmentValue");

    const startupValue =
        document.getElementById("startupValue");

    const customersValue =
        document.getElementById("customersValue");

    const priceValue =
        document.getElementById("priceValue");

    const costValue =
        document.getElementById("costValue");

    const marketingValue =
        document.getElementById("marketingValue");


    const businessResult =
        document.getElementById("businessResult");

    const businessStatus =
        document.getElementById("businessStatus");

    const remainingCapital =
        document.getElementById("remainingCapital");

    const totalExpenses =
        document.getElementById("totalExpenses");



    function updateBusiness() {

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


        const investmentNumber =
            Number(investment.value);

        const startupNumber =
            Number(startupCost.value);

        const customersNumber =
            Number(customers.value);

        const priceNumber =
            Number(productPrice.value);

        const operatingNumber =
            Number(operatingCost.value);

        const marketingNumber =
            Number(marketing.value);



        investmentValue.textContent =
            "$" +
            investmentNumber.toLocaleString();


        startupValue.textContent =
            "$" +
            startupNumber.toLocaleString();


        customersValue.textContent =
            customersNumber.toLocaleString();


        priceValue.textContent =
            "$" +
            priceNumber.toLocaleString();


        costValue.textContent =
            "$" +
            operatingNumber.toLocaleString();


        marketingValue.textContent =
            "$" +
            marketingNumber.toLocaleString();



        // ==========================================
        // REVENUE
        // ==========================================

        const revenue =
            customersNumber *
            priceNumber;



        // ==========================================
        // TOTAL EXPENSES
        // ==========================================

        const expenses =
            startupNumber +
            operatingNumber +
            marketingNumber;



        // ==========================================
        // PROFIT
        // ==========================================

        const profit =
            revenue -
            expenses;



        // ==========================================
        // REMAINING CAPITAL
        // ==========================================

        const remaining =
            investmentNumber -
            expenses;



        // ==========================================
        // RESULT
        // ==========================================

        if (profit >= 0) {

            businessResult.textContent =
                "+$" +
                profit.toLocaleString();

            businessStatus.textContent =
                "Estimated profit from the selected business variables.";

        } else {

            businessResult.textContent =
                "-$" +
                Math.abs(profit).toLocaleString();

            businessStatus.textContent =
                "Estimated loss from the selected business variables.";

        }



        // ==========================================
        // BUDGET
        // ==========================================

        if (remainingCapital) {

            if (remaining >= 0) {

                remainingCapital.textContent =
                    "$" +
                    remaining.toLocaleString();

            } else {

                remainingCapital.textContent =
                    "-$" +
                    Math.abs(remaining).toLocaleString();

            }

        }


        if (totalExpenses) {

            totalExpenses.textContent =
                "$" +
                expenses.toLocaleString();

        }



        // ==========================================
        // SEND DATA TO ANIMATION
        // ==========================================

        window.businessData = {

            investment:
                investmentNumber,

            startupCost:
                startupNumber,

            customers:
                customersNumber,

            productPrice:
                priceNumber,

            operatingCost:
                operatingNumber,

            marketing:
                marketingNumber,

            revenue:
                revenue,

            expenses:
                expenses,

            profit:
                profit,

            remainingCapital:
                remaining

        };


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
    // BUSINESS EVENTS
    // ==========================================

    if (investment) {
        investment.addEventListener(
            "input",
            updateBusiness
        );
    }


    if (startupCost) {
        startupCost.addEventListener(
            "input",
            updateBusiness
        );
    }


    if (customers) {
        customers.addEventListener(
            "input",
            updateBusiness
        );
    }


    if (productPrice) {
        productPrice.addEventListener(
            "input",
            updateBusiness
        );
    }


    if (operatingCost) {
        operatingCost.addEventListener(
            "input",
            updateBusiness
        );
    }


    if (marketing) {
        marketing.addEventListener(
            "input",
            updateBusiness
        );
    }



    // ==========================================
    // INITIAL UPDATE
    // ==========================================

    updatePhysics();

    updateWater();

    updateSolar();

    updateBusiness();

});