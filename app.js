function hexToRGBA(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff].join(',') + ',' + alpha + ')';
    }
    return 'rgba(0,0,0,1)';
}
function getRGBAValues(string) {
    let cleaned = string.substring(string.indexOf('(') + 1, string.length -1);
    let split = cleaned.split(',');
    let intValues = [];
    for (let index in split) {
        intValues.push(parseInt(split[index]));
    }
    return intValues;
}

function randomColor() {
    let hexString = '0123456789abcdef';
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}
function shuffle(array) {
    for (let i = array.length - 1; i >=0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
}
function createPalette(partColor) {
    const item = document.createElement('div');
    item.className = 'palette_particle';
    item.style.backgroundColor = partColor.rgba;
    item.dataset.id = partColor.id;
    item.dataset.pos = partColor.pos;
    item.style.background = randomColor.rgba;

    item.addEventListener('click', function(e) {
        if (e.target.dataset.pos === 'out') {
            document.querySelector('.palette_unsort').appendChild(item);
            e.target.dataset.pos = 'in';
        } else  {
            document.querySelector('.palette_sort').appendChild(item);
            e.target.dataset.pos = 'out';
        }

        setTimeout(function() {
            saveProgress();
            document.querySelector('.score').textContent = 'Points: ' + localStorage.getItem('progress');
            document.querySelector('.score').textContent 
            if (CheckScore()) {
                saveProgress();
                querySelector('.score').textContent = 'Points: ' + localStorage.getItem('progress');
                
                alert('You win!');
                window.location.reload();
            }
        }, 300)
        
    });
    return item;
}

    function CheckScore() {
        let winScore = document.querySelector('.palette_sort').children;
        let score = [];

        for (let i = 0; i < winScore.length; i++) {
            score.push(winScore[i].dataset.id);
        }
        
        return score.toString() == ['4','3','2','1','0'].toString();
    }

    function saveProgress() {
        let score = Number(localStorage.getItem('progress')) ?? 0;
        score++;
        localStorage.setItem('progress', score);
        
        return score;
    }

let rgbaValues = getRGBAValues(hexToRGBA(randomColor(), 1.0));
let paletteParticles = [];
let alphaChannel = 0.0;
for (let i = 0; i < 5; i++) {
    paletteParticles.push({
        id: i,
        rgba: 'rgba(' + rgbaValues[0] + ',' + rgbaValues[1] + ',' + rgbaValues[2] + ',' + (rgbaValues[3] - alphaChannel).toFixed(1) + ')',
        pos: 'out'
        
});
    alphaChannel += 0.2
}
    shuffle(paletteParticles);
    console.log(paletteParticles);
    for (let j= paletteParticles.length - 1; j >= 0; j--) {
        document.querySelector('.palette_unsort').appendChild(createPalette(paletteParticles[j]));
        document.querySelector('.score').textContent = 'Points: ' + Number(localStorage.getItem('progress')) ?? 0;
    }

