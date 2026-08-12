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


    /* ترتيب العناصر */

    arm.appendChild(ball);
    arm.appendChild(glow);

    scene.appendChild(pivot);
    scene.appendChild(arm);
    scene.appendChild(forceText);
    scene.appendChild(ground);

    physicsAnimation.appendChild(scene);


    /* =========================================
       GET VARIABLES FROM YOUR HTML
    ========================================= */

    const force =
        document.getElementById("force");

    const mass =
        document.getElementById("mass");

    const angle =
        document.getElementById("angle");

    const length =
        document.getElementById("length");


    /* إذا المتغيرات غير موجودة نوقف */

    if (
        !force ||
        !mass ||
        !angle ||
        !length
    ) {
        return;
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

        const forceValue =
            Number(force.value);

        const massValue =
            Number(mass.value);

        const angleValue =
            Number(angle.value);

        const lengthValue =
            Number(length.value);


        /* ---------------------------------------
           LENGTH

           1m = قصير
           5m = طويل
        --------------------------------------- */

        const ropeHeight =
            120 +
            (
                (lengthValue - 1) / 4
            ) * 180;


        arm.style.height =
            ropeHeight + "px";


        /* ---------------------------------------
           MASS

           الكتلة تغير حجم الكرة
        --------------------------------------- */

        const ballSize =
            42 +
            (
                (massValue - 1) / 19
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


        /* ---------------------------------------
           FORCE

           القوة تزيد سعة الحركة
        --------------------------------------- */

        const forceEffect =
            0.35 +
            (forceValue / 100) * 0.65;


        const movement =
            angleValue *
            forceEffect;


        /* ---------------------------------------
           LENGTH

           البندول الأطول أبطأ
        --------------------------------------- */

        const gravity = 9.81;

        const period =
            2 *
            Math.PI *
            Math.sqrt(
                lengthValue / gravity
            );


        const speed =
            (2 * Math.PI) /
            period;


        time +=
            deltaTime * 0.001;


        /* حركة البندول */

        const currentAngle =
            Math.sin(
                time *
                speed *
                2.2
            ) *
            movement;


        arm.style.transform =
            "translateX(-50%) rotate(" +
            currentAngle +
            "deg)";


        /* ---------------------------------------
           FORCE TEXT
        --------------------------------------- */

        forceText.textContent =
            "FORCE  " +
            forceValue +
            " N";


        /* ---------------------------------------
           FORCE GLOW

           كلما زادت القوة تزيد إضاءة الكرة
        --------------------------------------- */

        const glowStrength =
            0.25 +
            (forceValue / 100) * 0.45;


        glow.style.background =
            "rgba(150, 85, 255, " +
            glowStrength +
            ")";

    }


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