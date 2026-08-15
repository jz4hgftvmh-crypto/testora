document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FIND WATER ANIMATION AREA
    ========================================= */

    const animationArea =
        document.querySelector("#water .animation-area");


    if (!animationArea) {
        return;
    }


    /* =========================================
       CLEAR PLACEHOLDER
    ========================================= */

    animationArea.innerHTML = "";


    /* =========================================
       CREATE SCENE
    ========================================= */

    const scene =
        document.createElement("div");

    scene.className =
        "filtration-scene";


    /* =========================================
       LABEL
    ========================================= */

    const label =
        document.createElement("div");

    label.className =
        "filtration-label";

    label.textContent =
        "WATER FILTRATION";


    /* =========================================
       DIRTY WATER TANK
    ========================================= */

    const tank =
        document.createElement("div");

    tank.className =
        "water-tank";


    const dirtyWater =
        document.createElement("div");

    dirtyWater.className =
        "dirty-water";


    tank.appendChild(dirtyWater);


    /* =========================================
       WATER STREAM
    ========================================= */

    const stream =
        document.createElement("div");

    stream.className =
        "water-stream";


    /* =========================================
       FILTER BODY
    ========================================= */

    const filterBody =
        document.createElement("div");

    filterBody.className =
        "filter-body";


    /* =========================================
       FILTER LAYERS
    ========================================= */

    const layerNames = [
        "SAND",
        "CHARCOAL",
        "GRAVEL",
        "FIBER",
        "MESH",
        "COTTON"
    ];


    const layerColors = [
        "linear-gradient(90deg, #c8b68e, #e1d0a8, #b9a477)",
        "linear-gradient(90deg, #37333f, #58515f, #2d2934)",
        "linear-gradient(90deg, #807d87, #aaa6b0, #69656f)",
        "linear-gradient(90deg, #b7d0dc, #d9edf5, #9dbdc9)",
        "linear-gradient(90deg, #717986, #9ba3af, #626a77)",
        "linear-gradient(90deg, #d7d7d7, #f0f0f0, #bcbcbc)"
    ];


    const filterLayers = [];


    for (let i = 0; i < 6; i++) {

        const layer =
            document.createElement("div");

        layer.className =
            "filter-layer";


        layer.textContent =
            layerNames[i];


        layer.style.background =
            layerColors[i];


        layer.style.height =
            "30px";


        filterBody.appendChild(layer);


        filterLayers.push(layer);
    }


    /* =========================================
       CLEAN WATER
    ========================================= */

    const cleanWater =
        document.createElement("div");

    cleanWater.className =
        "clean-water";


    /* =========================================
       RESULT TEXT
    ========================================= */

    const result =
        document.createElement("div");

    result.className =
        "filtration-result";


    /* =========================================
       ADD EVERYTHING
    ========================================= */

    scene.appendChild(label);

    scene.appendChild(tank);

    scene.appendChild(stream);

    scene.appendChild(filterBody);

    scene.appendChild(cleanWater);

    scene.appendChild(result);

    animationArea.appendChild(scene);


    /* =========================================
       GET CONTROLS
    ========================================= */

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


    if (
        !filter ||
        !waterSpeed ||
        !contamination ||
        !layers
    ) {
        return;
    }


    /* =========================================
       CREATE DIRT PARTICLES
    ========================================= */

    const particles = [];

    const particleCount = 24;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("div");

        particle.className =
            "dirt-particle";


        particle.style.left =
            (12 + Math.random() * 76) + "%";


        particle.style.top =
            (18 + Math.random() * 65) + "%";


        const size =
            3 + Math.random() * 6;


        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";


        tank.appendChild(particle);

        particles.push(particle);
    }


    /* =========================================
       UPDATE FILTRATION
    ========================================= */

    function updateFiltration() {

        const filterValueNumber =
            Number(filter.value);

        const speedValueNumber =
            Number(waterSpeed.value);

        const contaminationValueNumber =
            Number(contamination.value);

        const layersValueNumber =
            Number(layers.value);


        /* =====================================
           UPDATE NUMBERS BESIDE SLIDERS
        ===================================== */

        filterValue.textContent =
            filterValueNumber + "%";


        waterSpeedValue.textContent =
            speedValueNumber + "%";


        contaminationValue.textContent =
            contaminationValueNumber + "%";


        layersValue.textContent =
            layersValueNumber;


        /* =====================================
           CONTAMINATION
        ===================================== */

        const dirtOpacity =
            0.2 +
            (contaminationValueNumber / 100) * 0.65;


        dirtyWater.style.background =
            "linear-gradient(" +
            "180deg," +
            "rgba(115, 108, 145, " +
            dirtOpacity +
            ")," +
            "rgba(65, 55, 95, " +
            dirtOpacity +
            ")" +
            ")";


        filterLayers.forEach(
            function (layer, index) {

                if (index < layersValueNumber) {

                    layer.style.setProperty(
                        "display",
                        "flex",
                        "important"
                    );

                    layer.style.setProperty(
                        "opacity",
                        "1",
                        "important"
                    );

                    layer.style.setProperty(
                        "visibility",
                        "visible",
                        "important"
                    );

                } else {

                    layer.style.setProperty(
                        "display",
                        "none",
                        "important"
                    );

                    layer.style.setProperty(
                        "opacity",
                        "0",
                        "important"
                    );

                    layer.style.setProperty(
                        "visibility",
                        "hidden",
                        "important"
                    );
                }
            }
        );

        /* =====================================
           FILTER THICKNESS
        ===================================== */

        const layerScale =
            0.75 +
            (filterValueNumber / 100) * 0.5;


        filterLayers.forEach(
            function (layer) {

                layer.style.height =
                    (25 * layerScale) + "px";
            }
        );


        /* =====================================
           NUMBER OF ACTIVE LAYERS
        ===================================== */

        filterLayers.forEach(
            function (layer, index) {

                if (
                    index <
                    layersValueNumber
                ) {

                    layer.style.opacity =
                        "1";

                } else {

                    layer.style.opacity =
                        "0.12";
                }
            }
        );


        /* =====================================
           WATER QUALITY

           DEFAULT:

           Filter = 50
           Speed = 50
           Contamination = 30
           Layers = 3

           RESULT = 71%
        ===================================== */

        let quality =
            56
            + filterValueNumber * 0.30
            + layersValueNumber * 5
            - contaminationValueNumber * 0.25
            - speedValueNumber * 0.15;


        /* =====================================
           KEEP RESULT BETWEEN 0 AND 100
        ===================================== */

        quality =
            Math.max(
                0,
                Math.min(
                    100,
                    quality
                )
            );


        const roundedQuality =
            Math.round(quality);


        /* =====================================
           CLEAN WATER COLOR
        ===================================== */

        const blueOpacity =
            0.35 +
            quality / 180;


        cleanWater.style.background =
            "linear-gradient(" +
            "180deg," +
            "rgba(180, 225, 255, " +
            blueOpacity +
            ")," +
            "rgba(80, 145, 255, " +
            blueOpacity +
            ")" +
            ")";


        cleanWater.style.boxShadow =
            "0 0 25px rgba(100, 175, 255, " +
            (quality / 180) +
            ")";


        /* =====================================
           UPDATE RESULT
        ===================================== */

        waterResult.textContent =
            roundedQuality + "%";


        result.textContent =
            "WATER QUALITY  " +
            roundedQuality +
            "%";


        /* =====================================
           WATER SPEED
        ===================================== */

        const animationSpeed =
            Math.max(
                0.2,
                1.8 -
                speedValueNumber / 100
            );


        stream.style.animation =
            "waterFlow " +
            animationSpeed +
            "s linear infinite";
    }


    /* =========================================
       WATER FLOW ANIMATION
    ========================================= */

    const flowStyle =
        document.createElement("style");


    flowStyle.textContent = `

        @keyframes waterFlow {

            0% {
                transform:
                    translateX(-50%)
                    translateY(-8px);

                opacity: 0.35;
            }

            50% {
                transform:
                    translateX(-50%)
                    translateY(20px);

                opacity: 1;
            }

            100% {
                transform:
                    translateX(-50%)
                    translateY(70px);

                opacity: 0.3;
            }
        }

    `;


    document.head.appendChild(flowStyle);


    /* =========================================
       PARTICLE MOVEMENT
    ========================================= */

    let particleTime = 0;

    let lastTime =
        performance.now();


    function animateParticles(
        currentTime
    ) {

        const delta =
            currentTime -
            lastTime;


        lastTime =
            currentTime;


        particleTime +=
            delta * 0.001;


        particles.forEach(
            function (particle, index) {

                const baseTop =
                    18 +
                    (
                        index * 17
                    ) % 58;


                const movement =
                    Math.sin(
                        particleTime * 1.5 +
                        index
                    ) * 3;


                particle.style.top =
                    (
                        baseTop +
                        movement
                    ) + "%";
            }
        );


        requestAnimationFrame(
            animateParticles
        );
    }


    requestAnimationFrame(
        animateParticles
    );


    /* =========================================
       LISTEN TO SLIDERS
    ========================================= */

    filter.addEventListener(
        "input",
        updateFiltration
    );


    waterSpeed.addEventListener(
        "input",
        updateFiltration
    );


    contamination.addEventListener(
        "input",
        updateFiltration
    );


    layers.addEventListener(
        "input",
        updateFiltration
    );


    /* =========================================
       INITIAL STATE
    ========================================= */

    updateFiltration();

});