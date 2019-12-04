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

    // Run application
    addScanButtonOnclick();
})();