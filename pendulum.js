document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FIND PHYSICS ANIMATION AREA
    ========================================= */

    const physicsAnimation =
        document.querySelector(
            "#physics .animation-area"
        );

    if (!physicsAnimation) {
        return;
    }


    /* =========================================
       CREATE PENDULUM
    ========================================= */

    physicsAnimation.innerHTML = "";

    const scene =
        document.createElement("div");

    scene.className =
        "pendulum-scene";


    const pivot =
        document.createElement("div");

    pivot.className =
        "pendulum-pivot";


    const arm =
        document.createElement("div");

    arm.className =
        "pendulum-arm";


    const ball =
        document.createElement("div");

    ball.className =
        "pendulum-ball";


    const glow =
        document.createElement("div");

    glow.className =
        "pendulum-glow";


    const forceText =
        document.createElement("div");

    forceText.className =
        "pendulum-force";


    const ground =
        document.createElement("div");

    ground.className =
        "pendulum-ground";


    arm.appendChild(ball);
    arm.appendChild(glow);

    scene.appendChild(pivot);
    scene.appendChild(arm);
    scene.appendChild(forceText);
    scene.appendChild(ground);

    physicsAnimation.appendChild(scene);


    /* =========================================
       GET INPUTS
    ========================================= */

    const force =
        document.getElementById("force");

    const mass =
        document.getElementById("mass");

    const angle =
        document.getElementById("angle");

    const length =
        document.getElementById("length");

    const gravity =
        document.getElementById("gravity");

    const damping =
        document.getElementById("damping");


    /* =========================================
       GET VALUE TEXTS
    ========================================= */

    const forceValue =
        document.getElementById("forceValue");

    const massValue =
        document.getElementById("massValue");

    const angleValue =
        document.getElementById("angleValue");

    const lengthValue =
        document.getElementById("lengthValue");

    const gravityValue =
        document.getElementById("gravityValue");

    const dampingValue =
        document.getElementById("dampingValue");


    /* =========================================
       CHECK
    ========================================= */

    if (
        !force ||
        !mass ||
        !angle ||
        !length ||
        !gravity ||
        !damping
    ) {
        return;
    }


    /* =========================================
       UPDATE DISPLAY VALUES
    ========================================= */

    function updateValueLabels() {

        const forceNumber =
            Number(force.value);

        const massNumber =
            Number(mass.value);

        const angleNumber =
            Number(angle.value);

        const lengthNumber =
            Number(length.value);

        const gravityNumber =
            Number(gravity.value);

        const dampingNumber =
            Number(damping.value);


        if (forceValue) {
            forceValue.textContent =
                forceNumber + " N";
        }


        if (massValue) {
            massValue.textContent =
                massNumber + " kg";
        }


        if (angleValue) {
            angleValue.textContent =
                angleNumber + "°";
        }


        if (lengthValue) {
            lengthValue.textContent =
                lengthNumber.toFixed(1) + " m";
        }


        if (gravityValue) {
            gravityValue.textContent =
                gravityNumber.toFixed(2) +
                " m/s²";
        }


        if (dampingValue) {
            dampingValue.textContent =
                dampingNumber + "%";
        }

    }


    /* =========================================
       PENDULUM STATE
    ========================================= */

    let time = 0;

    let lastTime =
        performance.now();


    /* =========================================
       UPDATE PENDULUM
    ========================================= */

    function updatePendulum(deltaTime) {

        const forceNumber =
            Number(force.value);

        const massNumber =
            Number(mass.value);

        const angleNumber =
            Number(angle.value);

        const lengthNumber =
            Number(length.value);

        const gravityNumber =
            Number(gravity.value);

        const dampingNumber =
            Number(damping.value);


        /* =====================================
           UPDATE NUMBERS
        ===================================== */

        updateValueLabels();


        /* =====================================
           ROPE LENGTH
        ===================================== */

        const ropeHeight =
            120 +
            (
                (lengthNumber - 1) / 4
            ) * 180;


        arm.style.height =
            ropeHeight + "px";


        /* =====================================
           MASS
        ===================================== */

        const ballSize =
            42 +
            (
                (massNumber - 1) / 19
            ) * 32;


        ball.style.width =
            ballSize + "px";

        ball.style.height =
            ballSize + "px";


        glow.style.width =
            (ballSize + 22) + "px";

        glow.style.height =
            (ballSize + 22) + "px";


        ball.style.bottom =
            -(ballSize / 2) + "px";

        glow.style.bottom =
            -(ballSize / 2 + 10) + "px";


        /* =====================================
           FORCE
        ===================================== */

        const forceEffect =
            0.35 +
            (forceNumber / 100) * 0.65;


        const movement =
            angleNumber *
            forceEffect;


        /* =====================================
           GRAVITY + LENGTH
        ===================================== */

        const period =
            2 *
            Math.PI *
            Math.sqrt(
                lengthNumber /
                gravityNumber
            );


        const baseSpeed =
            (2 * Math.PI) /
            period;


        /* =====================================
           DAMPING
        ===================================== */

        const dampingNormalized =
            dampingNumber / 100;


        const dampingEffect =
            1 -
            dampingNormalized * 0.75;


        const finalMovement =
            movement *
            Math.max(
                0.25,
                dampingEffect
            );


        /* =====================================
           TIME
        ===================================== */

        time +=
            deltaTime * 0.001;


        /* =====================================
           MOVEMENT
        ===================================== */

        const currentAngle =
            Math.sin(
                time *
                baseSpeed *
                2.2
            ) *
            finalMovement;


        arm.style.transform =
            "translateX(-50%) rotate(" +
            currentAngle +
            "deg)";


        /* =====================================
           FORCE TEXT INSIDE ANIMATION
        ===================================== */

        forceText.textContent =
            "FORCE  " +
            forceNumber +
            " N";


        /* =====================================
           GLOW
        ===================================== */

        const forceGlow =
            0.25 +
            (forceNumber / 100) * 0.45;


        const massGlow =
            (massNumber / 20) * 0.15;


        const finalGlow =
            Math.min(
                0.9,
                forceGlow +
                massGlow
            );


        glow.style.background =
            "rgba(150, 85, 255, " +
            finalGlow +
            ")";


        /* =====================================
           GRAVITY VISUAL EFFECT
        ===================================== */

        const gravityBrightness =
            0.8 +
            (gravityNumber / 20) * 0.35;


        ball.style.filter =
            "brightness(" +
            gravityBrightness +
            ")";


        /* =====================================
           DAMPING VISUAL EFFECT
        ===================================== */

        const dampingBrightness =
            1 -
            dampingNormalized * 0.25;


        ball.style.opacity =
            dampingBrightness;


        /* =====================================
           FORCE VISUAL SCALE
        ===================================== */

        const ballScale =
            1 +
            (forceNumber / 100) * 0.08;

        ball.style.transform =
            "translateX(-50%) scale(" +
            ballScale +
            ")";

    }


    /* =========================================
       SLIDER EVENTS
    ========================================= */

    force.addEventListener(
        "input",
        updateValueLabels
    );

    mass.addEventListener(
        "input",
        updateValueLabels
    );

    angle.addEventListener(
        "input",
        updateValueLabels
    );

    length.addEventListener(
        "input",
        updateValueLabels
    );

    gravity.addEventListener(
        "input",
        updateValueLabels
    );

    damping.addEventListener(
        "input",
        updateValueLabels
    );


    /* =========================================
       INITIAL VALUES
    ========================================= */

    updateValueLabels();


    /* =========================================
       ANIMATION LOOP
    ========================================= */

    function animate(currentTime) {

        const deltaTime =
            currentTime -
            lastTime;


        lastTime =
            currentTime;


        updatePendulum(
            deltaTime
        );


        requestAnimationFrame(
            animate
        );

    }


    requestAnimationFrame(
        animate
    );

});

document.addEventListener("DOMContentLoaded", function () {

    const gravity = document.getElementById("gravity");
    const damping = document.getElementById("damping");

    const gravityValue =
        document.getElementById("gravityValue");

    const dampingValue =
        document.getElementById("dampingValue");


    function updatePhysicsNewValues() {

        if (gravity && gravityValue) {

            gravityValue.textContent =
                Number(gravity.value).toFixed(2) +
                " m/s²";

        }


        if (damping && dampingValue) {

            dampingValue.textContent =
                Number(damping.value) +
                "%";

        }

    }


    if (gravity) {
        gravity.addEventListener(
            "input",
            updatePhysicsNewValues
        );
    }


    if (damping) {
        damping.addEventListener(
            "input",
            updatePhysicsNewValues
        );
    }


    updatePhysicsNewValues();


});