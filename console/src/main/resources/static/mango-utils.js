(function (window){
    const MODULE_NAME = 'mango';

    if (window[MODULE_NAME]) return window[MODULE_NAME];

    function dataCharsToObj(chars) {
        let matched = chars.match(/(?<=<mango>).*(?=<\/mango>)/ig);
        if (!matched) return '';
        matched = matched[0].split(',');
        const result = {}
        matched.forEach(r => {
            const r1 = r.split('&&');
            if (r1) result[r1[0]] = r1[1];
        })
        return result
    }
    window[MODULE_NAME] = {
        dataCharsToObj,
    }
}(this))