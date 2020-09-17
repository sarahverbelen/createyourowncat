$(function () {
    let amountOfMarks = 1;
    let amountOfScars = 1;

    $.getJSON("art.json", function (json) {
        console.log(json);

        //fill the dropdowns
        //STYLE
        for (let style in json.styles) {
            $('#style').append(`<option value='${style}'>${style}</option>`);
        }

        // original loading
        let style = $('#style').val();
        loadFullBase(style);
        fillMarkingSelect(json.styles[style].marks, 0);
        fillScarSelect(json.styles[style].scars, 0);



        // load other style
        $('#style').change(function () {
            let style = $('#style').val();
            loadFullBase(style);

            $(".markingOption").remove();
            $(".scarOption").remove();
            fillMarkingSelect(json.styles[style].marks, 0);
            fillScarSelect(json.styles[style].scars, 0);

            for (let i = 1; i < amountOfMarks; i++) {
                $(`#mark${i}`).remove();
                $(`#mark${i}color`).remove();
                $(`#${i}`).remove();
                $(`#mark${i}label`).remove();
                $(`.${i}`).remove();
            }
            amountOfMarks = 1;

            for (let i = 1; i < amountOfScars; i++) {
                $(`#scar${i}`).remove();
                $(`#scar${i}label`).remove();
                $(`.${i}`).remove();
            }
            amountOfScars = 1;

            $(".markimage").remove();
            $(".scarimage").remove();
        });





        // Change style = load new markings, bases, etc
        $('#style').change(function () {
            style = $('#style').val();

            loadFullBase(style);
            changeMark(style);
            changeScar(style);
        });

        changeMark(style);
        changeScar(style);

        $("#addMarking").click(function () {
            amountOfMarks++;
            addMarkingField(amountOfMarks - 1, json.styles[style].marks);
            changeMark(style);
            changeOrder(amountOfMarks - 1);
            // checkAllMarks(amountOfMarks, style);
        });

        $("#addScar").click(function () {
            amountOfScars++;
            addScarField(amountOfScars - 1, json.styles[style].scars);
            changeScar(style);
            // checkAllMarks(amountOfMarks, style);
        });

        // HETEROCHROMIA
        $("#heterochromia").change(function () {
            heterochromia();
        });

        // COLLARS
        $("#collarShow").change(function () {
            collar();
        });


    });

    changeColor('base');
    changeColor('ears');
    changeColor('fluff');
    changeColor('eyes');
    changeColor('lefteye');
    changeColor('pupils');
    changeColor('leftpupil')
    changeColor('skin');

    changeColor('collar');
    changeColor('bell');

    changeOrder(0);

});

function changeOrder(mark) {
    $(`#mark${mark}order`).val(mark);
    $(`#mark${mark}order`).change(function() {
        // $(`#mark${mark}img`).css('z-index')
        if($(`#mark${mark}img`).css('z-index') != undefined) {
            $(`#mark${mark}img`).css('z-index', $(`#mark${mark}order`).val());
            console.log($(`#mark${mark}img`).css('z-index'));
        }

    });
}

function checkAllMarks(amountOfMarks, style) {
    for (i = 0; i < amountOfMarks; i++) {
        let markId = `#mark${i}`;

        $(markId).change(function () {
            addMarkingImage(style, $(markId).val(), i);
            startMarkingColor(`mark${i + 1}`);
            let opacity = $(`${i}`).val() / 100
            $(`#mark${i}img`).css('opacity', opacity);
        });
        changeMarkingColor(`mark${i}`);
    }

}

function checkAllScars(amountOfScars, style) {
    for (i = 0; i < amountOfScars; i++) {
        let scarId = `#scar${i}`;

        $(scarId).change(function () {
            addScarImage(style, $(scarId).val(), i);

        });

    }

}

function changeScar(style) {
    $(".scar").change(function (obj) {
        let scar = obj.currentTarget.id;

        addScarImage(style, $(`#${scar}`).val(), scar);
    });

}

function changeMark(style) {
    let opacity;
    $(".marking").change(function (obj) {
        let mark = obj.currentTarget.id;

        addMarkingImage(style, $(`#${mark}`).val(), mark);
        startMarkingColor(mark);
        changeMarkingColor(mark);
        $(mark + 'img').css('opacity', opacity);
    });



    $(`.slider`).change(function (obj) {
        let id = obj.currentTarget.id
        opacity = $(`#${id}`).val() / 100
        $(`#mark${id}img`).css('opacity', opacity);
    });
}

function addMarkingField(index, markings) {
    $(".markings").append(
        `<select name="marking${index}" id="mark${index}" class="marking">
            <option value="none">     </option>
        </select>
        <input type="color" id="mark${index}color" name="mark${index}" value="#ffffff">
        <input type="range" min="1" max="100" value="100" class="slider" id="${index}">
        <label for="mark${index}color" id="mark${index}label">Marking ${index + 1}</label> 
        <label for="mark${index}order" id="mark${index}label">Order:</label> <input type="number" id="mark${index}order" min="0"> <br class="${index}">
        <br class="${index}"><br class="${index}">`
    );

    fillMarkingSelect(markings, index);


}

function addScarField(index, scars) {
    $(".scars").append(
        `<select name="scar${index}" id="scar${index}" class="scar">
            <option value="none">     </option>
        </select>
        <label for="scar${index}" id="scar${index}label">Scar ${index + 1}</label> <br class="${index}"><br class="${index}">`
    );

    fillScarSelect(scars, index);


}

function appendImage(style, image) {
    $(`#${image}img`).remove();
    $("#cat").append(
        `<img src='art/${style}/${image}.png' id='${image}img' class='baseimage'>`
    )
}

function loadFullBase(style) {
    appendImage(style, 'base');
    appendImage(style, 'ears');
    appendImage(style, 'eyes');
    appendImage(style, 'pupils');
    appendImage(style, 'lefteye');
    appendImage(style, 'leftpupil');
    appendImage(style, 'eyeshade');
    appendImage(style, 'fluff');
    appendImage(style, 'skin');
    appendImage(style, 'lines');

    appendImage(style, 'collar');
    appendImage(style, 'collarlines');
    appendImage(style, 'collarthing');
    appendImage(style, 'bell');
    appendImage(style, 'belllines');

    startColor('base');
    startColor('ears');
    startColor('fluff');
    startColor('eyes');
    startColor('pupils');
    startColor('skin');

    startColor('collar');
    startColor('bell');

    heterochromia();
    collar();


}

function collar() {
    let collar = $("#collarShow").prop("checked");

    if (collar) {
        $(".collar").show();

        $("#collarimg").show();
        $("#collarlinesimg").show();
        $("#collarthingimg").show();

        showBell();

        $("#bellShow").change(function () {
            showBell();
        });

        showDogTeeth();

        $("#teeth").change(function () {
            showDogTeeth();
        });


    } else {
        $(".collar").hide();

        $("#collarimg").hide();
        $("#collarlinesimg").hide();
        $("#collarthingimg").hide();
        $("#bellimg").hide();
        $("#belllinesimg").hide();

        $(".dogteethimg").hide();
    }

}

function showDogTeeth() {
    $(".dogteethimg").remove();
    let dogteeth = $("#teeth").val();
    if (dogteeth != '' && dogteeth != 0) {
        console.log(dogteeth);
        for(i = 1; i <= dogteeth; i++) {
            addDogTeeth(i);
        }

    }

}

function showBell() {
    let bell = $("#bellShow").prop("checked");
    if (bell) {
        $(".bell").show();
        $("#bellimg").show();
        $("#belllinesimg").show();
    } else {
        $(".bell").hide();
        $("#bellimg").hide();
        $("#belllinesimg").hide();
    }
}

function heterochromia() {
    let heterochromia = $("#heterochromia").prop("checked");
    if (heterochromia) {
        $("#left").show();
        $("#righteye").text("Right Eye Base");
        $("#rightpupil").text("Right Pupil");

        $("#lefteyeimg").show();
        $("#leftpupilimg").show();
    } else {
        $("#left").hide();
        $("#righteye").text("Eyes Base");
        $("#rightpupil").text("Pupils");
        $("#lefteyeimg").hide();
        $("#leftpupilimg").hide();
    }
}

function addDogTeeth(number) {
    let style = $("#style").val();

    $(`#teeth${number}`).remove();
    $("#cat").append(
        `<img src='art/${style}/dogteeth/${number}.png' id='teeth${number}' class='baseimage dogteethimg'>`
    )
}

function changeColor(part) {
    $(`#${part}`).change(function () {
        let rgb = hexToRgb($(`#${part}`).val());

        const color = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(color);
        const result = solver.solve();

        $(`#${part}img`).attr('style', result.filter);

    });
}

function changeMarkingColor(mark) {
    //console.log(mark);
    $(`#${mark}color`).change(function () {
        let rgb = hexToRgb($(`#${mark}color`).val());

        const color = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(color);
        const result = solver.solve();

        $(`#${mark}img`).attr('style', result.filter);

    });
}

function startMarkingColor(mark) {
    // console.log(mark);
    let rgb = hexToRgb($(`#${mark}color`).val());

    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();

    $(`#${mark}img`).attr('style', result.filter);
}

function startColor(part) {
    let rgb = hexToRgb($(`#${part}`).val());

    const color = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(color);
    const result = solver.solve();

    $(`#${part}img`).attr('style', result.filter);
}

function addMarkingImage(style, marking, index) {
    $(`#${index}img`).remove();
    if (marking != 'none') {
        $("#cat").append(
            `<img src='art/${style}/markings/${marking}' id='${index}img' class='baseimage markimage'>`
        )
    }
}

function fillMarkingSelect(markings, index) {
    let sortedMarks = markings.sort();
    for (mark in sortedMarks) {
        let marking = sortedMarks[mark];
        let markingName = marking.split('.')[0];
        $(`#mark${index}`).append(`<option value='${marking}' class="markingOption">${markingName}</option>`)
    }

}

function addScarImage(style, scar, index) {

    $(`#${index}scar`).remove();
    if (scar != 'none') {
        $("#cat").append(
            `<img src='art/${style}/scars/${scar}' id='${index}scar' class='baseimage scarimage'>`
        )
    }
}

function fillScarSelect(scars, index) {
    let sortedScars = scars.sort();
    for (let sc in sortedScars) {
        let scar = sortedScars[sc];
        let scarName = scar.split('.')[0];
        $(`#scar${index}`).append(`<option value='${scar}' class="scarOption">${scarName}</option>`)
    }

}

















// CODE BELOW BY https://codepen.io/sosuke/pen/Pjoqqp
class Color {
    constructor(r, g, b) {
        this.set(r, g, b);
    }

    toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }

    set(r, g, b) {
        this.r = this.clamp(r);
        this.g = this.clamp(g);
        this.b = this.clamp(b);
    }

    hueRotate(angle = 0) {
        angle = angle / 180 * Math.PI;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        this.multiply([
            0.213 + cos * 0.787 - sin * 0.213,
            0.715 - cos * 0.715 - sin * 0.715,
            0.072 - cos * 0.072 + sin * 0.928,
            0.213 - cos * 0.213 + sin * 0.143,
            0.715 + cos * 0.285 + sin * 0.140,
            0.072 - cos * 0.072 - sin * 0.283,
            0.213 - cos * 0.213 - sin * 0.787,
            0.715 - cos * 0.715 + sin * 0.715,
            0.072 + cos * 0.928 + sin * 0.072,
        ]);
    }

    grayscale(value = 1) {
        this.multiply([
            0.2126 + 0.7874 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 + 0.2848 * (1 - value),
            0.0722 - 0.0722 * (1 - value),
            0.2126 - 0.2126 * (1 - value),
            0.7152 - 0.7152 * (1 - value),
            0.0722 + 0.9278 * (1 - value),
        ]);
    }

    sepia(value = 1) {
        this.multiply([
            0.393 + 0.607 * (1 - value),
            0.769 - 0.769 * (1 - value),
            0.189 - 0.189 * (1 - value),
            0.349 - 0.349 * (1 - value),
            0.686 + 0.314 * (1 - value),
            0.168 - 0.168 * (1 - value),
            0.272 - 0.272 * (1 - value),
            0.534 - 0.534 * (1 - value),
            0.131 + 0.869 * (1 - value),
        ]);
    }

    saturate(value = 1) {
        this.multiply([
            0.213 + 0.787 * value,
            0.715 - 0.715 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 + 0.285 * value,
            0.072 - 0.072 * value,
            0.213 - 0.213 * value,
            0.715 - 0.715 * value,
            0.072 + 0.928 * value,
        ]);
    }

    multiply(matrix) {
        const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
        const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
        const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR;
        this.g = newG;
        this.b = newB;
    }

    brightness(value = 1) {
        this.linear(value);
    }
    contrast(value = 1) {
        this.linear(value, -(0.5 * value) + 0.5);
    }

    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + intercept * 255);
        this.g = this.clamp(this.g * slope + intercept * 255);
        this.b = this.clamp(this.b * slope + intercept * 255);
    }

    invert(value = 1) {
        this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
        this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
        this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }

    hsl() {
        // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: h * 100,
            s: s * 100,
            l: l * 100,
        };
    }

    clamp(value) {
        if (value > 255) {
            value = 255;
        } else if (value < 0) {
            value = 0;
        }
        return value;
    }
}

class Solver {
    constructor(target, baseColor) {
        this.target = target;
        this.targetHSL = target.hsl();
        this.reusedColor = new Color(0, 0, 0);
    }

    solve() {
        const result = this.solveNarrow(this.solveWide());
        return {
            values: result.values,
            loss: result.loss,
            filter: this.css(result.values),
        };
    }

    solveWide() {
        const A = 5;
        const c = 15;
        const a = [60, 180, 18000, 600, 1.2, 1.2];

        let best = {
            loss: Infinity
        };
        for (let i = 0; best.loss > 25 && i < 3; i++) {
            const initial = [50, 20, 3750, 50, 100, 100];
            const result = this.spsa(A, a, c, initial, 1000);
            if (result.loss < best.loss) {
                best = result;
            }
        }
        return best;
    }

    solveNarrow(wide) {
        const A = wide.loss;
        const c = 2;
        const A1 = A + 1;
        const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
        return this.spsa(A, a, c, wide.values, 500);
    }

    spsa(A, a, c, values, iters) {
        const alpha = 1;
        const gamma = 0.16666666666666666;

        let best = null;
        let bestLoss = Infinity;
        const deltas = new Array(6);
        const highArgs = new Array(6);
        const lowArgs = new Array(6);

        for (let k = 0; k < iters; k++) {
            const ck = c / Math.pow(k + 1, gamma);
            for (let i = 0; i < 6; i++) {
                deltas[i] = Math.random() > 0.5 ? 1 : -1;
                highArgs[i] = values[i] + ck * deltas[i];
                lowArgs[i] = values[i] - ck * deltas[i];
            }

            const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (let i = 0; i < 6; i++) {
                const g = lossDiff / (2 * ck) * deltas[i];
                const ak = a[i] / Math.pow(A + k + 1, alpha);
                values[i] = fix(values[i] - ak * g, i);
            }

            const loss = this.loss(values);
            if (loss < bestLoss) {
                best = values.slice(0);
                bestLoss = loss;
            }
        }
        return {
            values: best,
            loss: bestLoss
        };

        function fix(value, idx) {
            let max = 100;
            if (idx === 2 /* saturate */ ) {
                max = 7500;
            } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */ ) {
                max = 200;
            }

            if (idx === 3 /* hue-rotate */ ) {
                if (value > max) {
                    value %= max;
                } else if (value < 0) {
                    value = max + value % max;
                }
            } else if (value < 0) {
                value = 0;
            } else if (value > max) {
                value = max;
            }
            return value;
        }
    }

    loss(filters) {
        // Argument is array of percentages.
        const color = this.reusedColor;
        color.set(0, 0, 0);

        color.invert(filters[0] / 100);
        color.sepia(filters[1] / 100);
        color.saturate(filters[2] / 100);
        color.hueRotate(filters[3] * 3.6);
        color.brightness(filters[4] / 100);
        color.contrast(filters[5] / 100);

        const colorHSL = color.hsl();
        return (
            Math.abs(color.r - this.target.r) +
            Math.abs(color.g - this.target.g) +
            Math.abs(color.b - this.target.b) +
            Math.abs(colorHSL.h - this.targetHSL.h) +
            Math.abs(colorHSL.s - this.targetHSL.s) +
            Math.abs(colorHSL.l - this.targetHSL.l)
        );
    }

    css(filters) {
        function fmt(idx, multiplier = 1) {
            return Math.round(filters[idx] * multiplier);
        }
        return `filter: brightness(0%) saturate(100%) invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%);`;
    }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ] :
        null;
}