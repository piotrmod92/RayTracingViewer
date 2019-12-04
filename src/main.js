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
    }

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
    }

    const initCanvas = () => {
        const canvas = document.getElementById("canvas");
        const engine = new BABYLON.Engine(canvas, true);

        const createScene = () => {
            // Scene, camera, lights 
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color3.Gray();
            const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
            const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            const light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
            
            // Objects
            var box1 = BABYLON.MeshBuilder.CreateBox("box", {height: 0.2, width: 5, depth: 1}, scene);
            box1.position.y=.4;
            var box2 = BABYLON.MeshBuilder.CreateBox("box", {height: 0.2, width: 5, depth: 1}, scene);
            box2.position.y=-.4;
            return scene;
        };

        const scene = createScene();
        engine.runRenderLoop(() => { 
            scene.render();
        });

        window.addEventListener("resize", () => { 
            engine.resize();
        });
    }

    // Run application
    addScanButtonOnclick();
    initCanvas();
})();