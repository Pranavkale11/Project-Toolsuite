/**
 * Glass Studio Logic
 * Handles real-time CSS variable updates
 */

const initGlassStudio = () => {
    console.log("Glass Studio Logic Initialized");

    // Grab elements
    const blurIn = document.getElementById('blurInput');
    const opacityIn = document.getElementById('opacityInput');
    const colorIn = document.getElementById('colorInput');
    const outlineIn = document.getElementById('outlineInput');
    const shadowIn = document.getElementById('shadowInput');
    const noiseIn = document.getElementById('noiseInput');
    const envIn = document.getElementById('envInput');
    const codeOut = document.getElementById('codeOutput');
    const canvas = document.getElementById('canvas');
    const blobs = document.getElementById('blobs');
    const copyBtn = document.getElementById('copyBtn');

    // Convert hex to rgb string: #ffffff -> 255, 255, 255
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    const update = () => {
        const rgb = hexToRgb(colorIn.value);
        
        // Update Labels
        document.getElementById('v-blur').innerText = blurIn.value + 'px';
        document.getElementById('v-opacity').innerText = opacityIn.value;
        document.getElementById('v-outline').innerText = outlineIn.value;
        document.getElementById('v-shadow').innerText = shadowIn.value + 'px';
        document.getElementById('v-noise').innerText = noiseIn.value;

        // Set CSS Variables on root
        const root = document.documentElement;
        root.style.setProperty('--blur', blurIn.value + 'px');
        root.style.setProperty('--opacity', opacityIn.value);
        root.style.setProperty('--tint', rgb);
        root.style.setProperty('--outline', outlineIn.value);
        root.style.setProperty('--elevation', shadowIn.value + 'px');
        root.style.setProperty('--noise', noiseIn.value);

        // Update Code Box
        codeOut.innerText = `background: rgba(${rgb}, ${opacityIn.value});
backdrop-filter: blur(${blurIn.value}px);
-webkit-backdrop-filter: blur(${blurIn.value}px);
border: 1px solid rgba(255, 255, 255, ${outlineIn.value});
box-shadow: 0 10px ${shadowIn.value}px 0 rgba(0, 0, 0, 0.25);`;
    };

    // Listeners
    [blurIn, opacityIn, colorIn, outlineIn, shadowIn, noiseIn].forEach(el => {
        el.addEventListener('input', update);
    });

    envIn.addEventListener('change', (e) => {
        const mode = e.target.value;
        blobs.style.display = mode === 'dark' ? 'none' : 'block';
        if(mode === 'mesh') canvas.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        if(mode === 'deep') canvas.style.background = 'linear-gradient(135deg, #000428, #004e92)';
        if(mode === 'dark') canvas.style.background = '#0a0a0a';
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeOut.innerText);
        copyBtn.innerText = "COPIED!";
        setTimeout(() => copyBtn.innerText = "COPY CSS", 2000);
    });

    // Initial Trigger
    update();
};

// Ensure DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlassStudio);
} else {
    initGlassStudio();
}
