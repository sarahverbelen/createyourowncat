$(function () {
    randomizeName();

    $("#nameGenerator").click(function() {
        randomizeName();
    });
    
});

function randomizeName() {
    $.getJSON("names.json", function (json) {
        let prefixIndex = Math.floor(Math.random(json.prefixes.length) * json.prefixes.length);
        let prefix = json.prefixes[prefixIndex];

        let suffixIndex = Math.floor(Math.random(json.suffixes.length) * json.suffixes.length);
        let suffix = json.suffixes[suffixIndex];

        let name = prefix + suffix;
        $("#name").text(name);
    });
}