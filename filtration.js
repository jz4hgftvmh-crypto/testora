document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FIND WATER ANIMATION AREA
    ========================================= */

    const animationArea =
        document.querySelector(
            "#water .animation-area"
        );


    if (!animationArea) {
        return;
    }


    /* =========================================
       CLEAR PLACEHOLDER ONLY
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


    tank.appendChild(
        dirtyWater
    );


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


    const sand =
        document.createElement("div");

    sand.className =
        "filter-layer filter-sand";

    sand.textContent =
        "SAND";


    const charcoal =
        document.createElement("div");

    charcoal.className =
        "filter-layer filter-charcoal";

    charcoal.textContent =
        "CHARCOAL";


    const gravel =
        document.createElement("div");

    gravel.className =
        "filter-layer filter-gravel";

    gravel.textContent =
        "GRAVEL";


    filterBody.appendChild(
        sand
    );

    filterBody.appendChild(
        charcoal
    );

    filterBody.appendChild(
        gravel
    );


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
       GET VARIABLES FROM EXISTING HTML
    ========================================= */

    const filter =
        document.getElementById("filter");

    const waterSpeed =
        document.getElementById("waterSpeed");

    const contamination =
        document.getElementById("contamination");

    const layers =
        document.getElementById("layers");


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


        tank.appendChild(
            particle
        );


        particles.push(
            particle
        );
    }


    /* =========================================
       UPDATE FILTRATION
    ========================================= */

    function updateFiltration() {

        const filterValue =
            Number(filter.value);

        const speedValue =
            Number(waterSpeed.value);

        const contaminationValue =
            Number(contamination.value);

        const layersValue =
            Number(layers.value);


        /* ---------------------------------------
           CONTAMINATION

           كلما زادت الشوائب:
           - لون الماء أغمق
           - الجسيمات أكثر وضوحًا
        --------------------------------------- */

        const dirtOpacity =
            0.2 +
            (contaminationValue / 100) * 0.65;


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


        particles.forEach(
            function (particle, index) {

                const visibleLimit =
                    Math.ceil(
                        particleCount *
                        (contaminationValue / 100)
                    );


                if (index < visibleLimit) {

                    particle.style.opacity =
                        "0.9";

                } else {

                    particle.style.opacity =
                        "0.08";
                }
            }
        );


        /* ---------------------------------------
           FILTER THICKNESS

           نستخدمها لتكبير طبقات الفلتر
        --------------------------------------- */

        const layerScale =
            0.65 +
            (filterValue / 100) * 0.7;


        sand.style.height =
            (30 * layerScale) + "px";

        charcoal.style.height =
            (30 * layerScale) + "px";

        gravel.style.height =
            (30 * layerScale) + "px";


        /* ---------------------------------------
           NUMBER OF LAYERS
        --------------------------------------- */

        sand.style.opacity =
            layersValue >= 1
                ? "1"
                : "0.15";


        charcoal.style.opacity =
            layersValue >= 2
                ? "1"
                : "0.15";


        gravel.style.opacity =
            layersValue >= 3
                ? "1"
                : "0.15";


        /* ---------------------------------------
           FILTRATION QUALITY

           نعطي نتيجة بصرية ومنطقية
        --------------------------------------- */

        let quality =
            35
            + filterValue * 0.3
            + layersValue * 8
            - contaminationValue * 0.25
            - speedValue * 0.12;


        quality =
            Math.max(
                0,
                Math.min(
                    100,
                    quality
                )
            );


        /* ---------------------------------------
           CLEAN WATER COLOR

           كلما زادت الجودة:
           الماي يصير أوضح
        --------------------------------------- */

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


        result.textContent =
            "WATER QUALITY  " +
            Math.round(quality) +
            "%";


        /* ---------------------------------------
           WATER SPEED

           السرعة تتحكم بسرعة حركة stream
        --------------------------------------- */

        const speed =
            Math.max(
                0.2,
                1.8 -
                speedValue / 100
            );


        stream.style.animation =
            "waterFlow " +
            speed +
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


    document.head.appendChild(
        flowStyle
    );


    /* =========================================
       CONTINUOUS PARTICLE MOVEMENT
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