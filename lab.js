document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // EXPERIMENT BUTTONS
    // ==========================================

    const buttons = document.querySelectorAll(".experiment-button");
    const experiments = document.querySelectorAll(".experiment-content");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // اسم التجربة من data-experiment
            const experimentName = button.dataset.experiment;


            // إزالة التفعيل من كل الأزرار
            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });


            // تفعيل الزر المضغوط
            button.classList.add("active");


            // إخفاء كل التجارب
            experiments.forEach(function (experiment) {
                experiment.classList.remove("active");
            });


            // إظهار التجربة المطلوبة
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

    const forceValue = document.getElementById("forceValue");
    const massValue = document.getElementById("massValue");
    const angleValue = document.getElementById("angleValue");
    const lengthValue = document.getElementById("lengthValue");

    const physicsResult =
        document.getElementById("physicsResult");


    function updatePhysics() {

        if (!force) return;

        const forceNumber = Number(force.value);
        const massNumber = Number(mass.value);
        const angleNumber = Number(angle.value);
        const lengthNumber = Number(length.value);


        forceValue.textContent =
            forceNumber + " N";

        massValue.textContent =
            massNumber + " kg";

        angleValue.textContent =
            angleNumber + "°";

        lengthValue.textContent =
            lengthNumber + " m";


        // القوة ÷ الكتلة = التسارع
        const acceleration =
            forceNumber / massNumber;


        physicsResult.textContent =
            acceleration.toFixed(2) + " m/s²";
    }


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

        if (!filter) return;


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


        /*
            كلما زادت:
            - سماكة الفلتر
            - عدد الطبقات

            تزيد جودة الماء.

            وكلما زادت:
            - سرعة الماء
            - التلوث

            تقل الجودة.
        */

        let quality =
            50
            + filterNumber * 0.25
            + layersNumber * 5
            - speedNumber * 0.12
            - contaminationNumber * 0.30;


        // نخلي النتيجة بين 0 و 100
        quality =
            Math.max(0, Math.min(100, quality));


        waterResult.textContent =
            Math.round(quality) + "%";
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

        if (!sunlight) return;


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


        /*
            نحسب تأثير زاوية اللوح.
            أفضل زاوية هنا 45 درجة.
        */

        const angleEffect =
            Math.cos(
                (
                    Math.abs(angleNumber - 45)
                    * Math.PI
                ) / 180
            );


        let output =
            sunlightNumber
            * (efficiencyNumber / 20)
            * hoursNumber
            * angleEffect
            * 0.6;


        output =
            Math.max(0, output);


        solarResult.textContent =
            Math.round(output) + " units";
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
    // INITIAL VALUES
    // ==========================================

    updatePhysics();
    updateWater();
    updateSolar();

});