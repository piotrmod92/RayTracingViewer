(() => {
    // Variables definition
    let angle = 0;

    // Functions definitions
    const addScanButtonOnclick = () => {
        const $button = document.getElementsByClassName('angle-scan')[0];
        $button.addEventListener('click', () => {
            if ($button.classList.contains('angle-scan--start')) {
                $button.classList.remove('angle-scan--start');
                $button.classList.add('angle-scan--pause');
                $button.innerHTML = 'Pause angle scan';
            } else if ($button.classList.contains('angle-scan--pause')) {
                $button.classList.remove('angle-scan--pause');
                $button.classList.add('angle-scan--resume');
                $button.innerHTML = 'Resume angle scan';
            } else if ($button.classList.contains('angle-scan--resume')) {
                $button.classList.remove('angle-scan--resume');
                $button.classList.add('angle-scan--pause');
                $button.innerHTML = 'Pause angle scan';
            }
        });
    }

    // Run application
    addScanButtonOnclick();

})();