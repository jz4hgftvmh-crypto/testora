document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       SOLAR ANIMATION AREA
    ========================================= */

    const animationArea =
        document.querySelector("#solar .animation-area");

    if (!animationArea) {
        return;
    }


    /* =========================================
       CLEAR OLD CONTENT
    ========================================= */

    animationArea.innerHTML = "";


    /* =========================================
       CREATE MAIN SCENE
    ========================================= */

    const scene = document.createElement("div");
    scene.className = "solar-scene";


    /* =========================================
       SUN
    ========================================= */

    const sun = document.createElement("div");
    sun.className = "solar-sun";

    scene.appendChild(sun);


    /* =========================================
       CLOUD
    ========================================= */

    const cloud = document.createElement("div");
    cloud.className = "solar-cloud";

    scene.appendChild(cloud);


    /* =========================================
       PANEL
    ========================================= */

    const panel = document.createElement("div");
    panel.className = "solar-panel";

    scene.appendChild(panel);


    /* =========================================
       PANEL GLOW
    ========================================= */

    const glow = document.createElement("div");
    glow.className = "solar-glow";

    scene.appendChild(glow);


    /* =========================================
       ENERGY OUTPUT
    ========================================= */

    const output = document.createElement("div");
    output.className = "solar-output";

    scene.appendChild(output);


    /* =========================================
       SUN RAYS
    ========================================= */

    const rays = [];

    for (let i = 0; i < 8; i++) {

        const ray = document.createElement("div");

        ray.className = "solar-ray";

        ray.style.width = "95px";

        ray.style.left = "calc(100% - 45px)";
        ray.style.top = "72px";

        ray.style.transform =
            "rotate(" + (i * 45) + "deg)";

        scene.appendChild(ray);

        rays.push(ray);
    }


    /* =========================================
       ENERGY BEAMS
    ========================================= */

    const beams = [];

    for (let i = 0; i < 9; i++) {

        const beam =
            document.createElement("div");

        beam.className =
            "energy-beam";

        beam.style.left =
            (30 + i * 5) + "%";

        beam.style.top =
            "140px";

        beam.style.animationDelay =
            (i * 0.15) + "s";

        scene.appendChild(beam);

        beams.push(beam);
    }


    animationArea.appendChild(scene);


    /* =========================================
       GET SLIDERS
    ========================================= */

    const sunlight =
        document.getElementById("sunlight");

    const panelAngle =
        document.getElementById("panelAngle");

    const efficiency =
        document.getElementById("efficiency");

    const cloudCover =
        document.getElementById("cloudCover");


    if (
        !sunlight ||
        !panelAngle ||
        !efficiency ||
        !cloudCover
    ) {
        return;
    }


    /* =========================================
       EXTRA VISUAL ELEMENT:
       ENERGY PARTICLES
    ========================================= */

    const energyParticles = [];

    for (let i = 0; i < 14; i++) {

        const particle =
            document.createElement("div");

        particle.style.position = "absolute";

        particle.style.width = "5px";
        particle.style.height = "5px";

        particle.style.borderRadius = "50%";

        particle.style.background =
            "rgba(210, 180, 255, 0.9)";

        particle.style.boxShadow =
            "0 0 10px rgba(160, 100, 255, 0.8)";

        particle.style.left =
            (30 + Math.random() * 40) + "%";

        particle.style.top =
            (170 + Math.random() * 100) + "px";

        particle.style.opacity = "0";

        particle.style.pointerEvents = "none";

        scene.appendChild(particle);

        energyParticles.push(particle);
    }


    /* =========================================
       UPDATE SOLAR SYSTEM
    ========================================= */

    function updateSolar() {

        const sunlightValue =
            Number(sunlight.value);

        const angleValue =
            Number(panelAngle.value);

        const efficiencyValue =
            Number(efficiency.value);

        const cloudValue =
            Number(cloudCover.value);


        /* =====================================
           1. SUNLIGHT INTENSITY
        ===================================== */

        const sunScale =
            0.65 +
            (sunlightValue / 100) * 0.65;

        sun.style.transform =
            "scale(" +
            sunScale +
            ")";


        const sunOpacity =
            0.35 +
            (sunlightValue / 100) * 0.65;

        sun.style.opacity =
            sunOpacity;


        /* =====================================
           SUN GLOW
        ===================================== */

        const sunGlow =
            20 +
            sunlightValue * 0.45;

        sun.style.boxShadow =
            "0 0 " +
            sunGlow +
            "px rgba(255,210,100,0.9), " +

            "0 0 " +
            (sunGlow * 2.3) +
            "px rgba(255,185,70,0.45)";


        /* =====================================
           SUN RAYS
        ===================================== */

        rays.forEach(function (ray) {

            const rayOpacity =
                (
                    sunlightValue / 100
                ) *
                (
                    1 -
                    cloudValue / 100
                );

            ray.style.opacity =
                Math.max(
                    0.05,
                    rayOpacity
                );


            ray.style.height =
                (
                    2 +
                    sunlightValue / 35
                ) + "px";
        });


        /* =====================================
           2. CLOUD COVER
        ===================================== */

        const cloudScale =
            0.7 +
            (cloudValue / 100) * 1.3;


        cloud.style.transform =
            "translateX(" +
            (
                cloudValue * 0.8
            ) +
            "px) " +
            "scale(" +
            cloudScale +
            ")";


        cloud.style.opacity =
            0.05 +
            (cloudValue / 100) * 0.95;


        /*
            كلما زادت الغيوم،
            تصير أقرب للشمس بصريًا.
        */

        cloud.style.left =
            (
                25 +
                cloudValue * 0.35
            ) + "%";


        /* =====================================
           3. PANEL ANGLE
        ===================================== */

        /*
            هنا الفرق صار واضح جدًا.

            0  → اللوح منخفض
            45 → متوسط
            90 → عالي
        */

        const visualAngle =
            15 +
            angleValue * 0.8;


        panel.style.transform =
            "translateX(-50%) " +
            "rotateX(" +
            visualAngle +
            "deg) " +
            "rotateZ(-4deg)";


        /* =====================================
           4. PANEL EFFICIENCY
        ===================================== */

        /*
            الكفاءة تغير سطوع اللوح
            وقوة الطاقة الخارجة منه.
        */

        const efficiencyBrightness =
            0.55 +
            (efficiencyValue / 100) * 0.8;


        panel.style.filter =
            "brightness(" +
            efficiencyBrightness +
            ")";


        /* =====================================
           5. ENERGY CALCULATION
        ===================================== */

        /*
            أفضل زاوية = تقريبًا 45°

            كلما ابتعدنا عنها
            تقل الاستفادة.
        */

        const angleDifference =
            Math.abs(
                angleValue - 45
            );


        const angleEffect =
            Math.max(
                0.15,
                1 -
                angleDifference / 65
            );


        /*
            الغيوم تقلل الضوء.
        */

        const cloudEffect =
            1 -
            (cloudValue / 100) * 0.9;


        /*
            الطاقة الناتجة.
        */

        let energy =
            sunlightValue *
            (efficiencyValue / 100) *
            angleEffect *
            cloudEffect *
            10;


        energy =
            Math.max(
                0,
                energy
            );


        /* =====================================
           6. ENERGY BEAMS
        ===================================== */

        const beamPower =
            Math.max(
                0.03,
                (
                    sunlightValue / 100
                ) *
                (
                    efficiencyValue / 100
                ) *
                angleEffect *
                cloudEffect
            );


        beams.forEach(function (beam, index) {

            beam.style.opacity =
                beamPower;


            /*
                الطاقة العالية تخلي
                الأشعة أسرع.
            */

            const beamSpeed =
                2.2 -
                beamPower * 1.3;


            beam.style.animationDuration =
                Math.max(
                    0.7,
                    beamSpeed
                ) + "s";


            /*
                إذا الغيوم عالية،
                الأشعة تقل.
            */

            if (cloudValue > 70) {

                beam.style.filter =
                    "blur(2px)";

            } else {

                beam.style.filter =
                    "none";
            }
        });


        /* =====================================
           7. ENERGY PARTICLES
        ===================================== */

        energyParticles.forEach(
            function (particle, index) {

                const delay =
                    index * 0.12;


                particle.style.opacity =
                    beamPower *
                    0.9;


                particle.style.transform =
                    "translateY(" +
                    (
                        -(
                            Date.now() / 20 +
                            index * 30
                        ) % 120
                    ) +
                    "px)";
            }
        );


        /* =====================================
           8. PANEL GLOW
        ===================================== */

        const glowOpacity =
            0.1 +
            beamPower * 0.8;


        glow.style.opacity =
            glowOpacity;


        glow.style.transform =
            "translateX(-50%) " +
            "scale(" +
            (
                0.7 +
                beamPower * 0.8
            ) +
            ")";


        /* =====================================
           9. OUTPUT TEXT
        ===================================== */

        output.textContent =
            "ENERGY OUTPUT  " +
            Math.round(energy) +
            " W";
    }


    /* =========================================
       ANIMATION LOOP
    ========================================= */

    function animate() {

        /*
            نخلي الجسيمات تتحرك
            بشكل مستمر.
        */

        energyParticles.forEach(
            function (particle, index) {

                const movement =
                    (
                        Date.now() / 12 +
                        index * 35
                    ) % 150;


                particle.style.transform =
                    "translateY(" +
                    movement +
                    "px)";
            }
        );


        requestAnimationFrame(
            animate
        );
    }


    /* =========================================
       SLIDER EVENTS
    ========================================= */

    sunlight.addEventListener(
        "input",
        updateSolar
    );

    panelAngle.addEventListener(
        "input",
        updateSolar
    );

    efficiency.addEventListener(
        "input",
        updateSolar
    );

    cloudCover.addEventListener(
        "input",
        updateSolar
    );


    /* =========================================
       START
    ========================================= */

    updateSolar();

    animate();

});