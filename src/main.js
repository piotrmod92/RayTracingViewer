(() => {
    // Global variables definition
    let scanInterval;
    const scanIntervalTime = 100;
    const lowerAngleLimit = -60;
    const upperAngleLimit = 60;
    let positiveScanDirection = true;

    // Functions definitions
    const addScanButtonOnclick = () => {
        const $button = document.getElementsByClassName('angle-scan')[0];
        $button.addEventListener('click', () => {
            if ($button.classList.contains('angle-scan--start')) {
                $button.classList.remove('angle-scan--start');
                $button.classList.add('angle-scan--pause');
                $button.innerHTML = 'Pause angle scan';
                scanInterval = setInterval(() => {
                    const $angleInput = document.getElementById('angle');
                    const currentAngle = parseInt($angleInput.value);
                    $angleInput.value = generateAngle(currentAngle, lowerAngleLimit, upperAngleLimit);
                }, scanIntervalTime);
            } else if ($button.classList.contains('angle-scan--pause')) {
                $button.classList.remove('angle-scan--pause');
                $button.classList.add('angle-scan--resume');
                $button.innerHTML = 'Resume angle scan';
                clearInterval(scanInterval);
            } else if ($button.classList.contains('angle-scan--resume')) {
                $button.classList.remove('angle-scan--resume');
                $button.classList.add('angle-scan--pause');
                $button.innerHTML = 'Pause angle scan';
                scanInterval = setInterval(() => {
                    const $angleInput = document.getElementById('angle');
                    const currentAngle = parseInt($angleInput.value);
                    $angleInput.value = generateAngle(currentAngle, lowerAngleLimit, upperAngleLimit);
                }, scanIntervalTime);
            }
        });
    };

    const generateAngle = (angle, lowerLimit, upperLimit) => {
        if (!Number.isInteger(angle) || !Number.isInteger(lowerLimit) || !Number.isInteger(upperLimit) || angle < lowerLimit || angle > upperLimit) {
            console.warn('Wrong parameter(s) in generateAngle');
        } else {
            if (positiveScanDirection) {
                if (angle == upperLimit) {
                    angle--;
                    positiveScanDirection = false;
                } else {
                    angle++;
                }
            } else {
                if (angle == lowerLimit) {
                    angle++;
                    positiveScanDirection = true;
                } else {
                    angle--;
                }
            }
        }
        return angle;
    };

    const initCanvas = () => {
        const canvas = document.getElementById("canvas");
        const engine = new BABYLON.Engine(canvas, true);
        let box1;
        let box2;

        const createScene = () => {
            // Scene, camera, lights 
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color3.Gray();
            const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
            const light = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 10, -10), scene);
            
            // Objects
            const length = parseFloat(document.getElementById('length').value);
            const gap = parseFloat(document.getElementById('gap').value);
            box1 = BABYLON.MeshBuilder.CreateBox("box", {height: 0.2, depth: 2, width: length}, scene);
            box2 = BABYLON.MeshBuilder.CreateBox("box", {height: 0.2, depth: 2, width: length}, scene);
            box1.position.y = 0.1 + 0.5 * gap;
            box2.position.y = -0.1 - 0.5 * gap;
            return scene;
        };

        const scene = createScene();
        engine.runRenderLoop(() => {
            const length = parseFloat(document.getElementById('length').value);
            const gap = parseFloat(document.getElementById('gap').value);
            // Divide current length by initial length (5 cm)
            box1.scaling.x = length / 5;
            box2.scaling.x = length / 5;
            box1.position.y = 0.1 + 0.5 * gap;
            box2.position.y = -0.1 - 0.5 * gap;
            scene.render();
        });

        window.addEventListener("resize", () => {
            engine.resize();
        });
    };

    // Run application
    addScanButtonOnclick();
    initCanvas();
})();