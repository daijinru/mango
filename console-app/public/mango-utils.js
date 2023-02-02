(function (window) {
    function dataCharsToObj(chars) {
        let matched = chars.match(/(?<=<mango>).*(?=<\/mango>)/ig);
        if (!matched) return '';
        matched = matched[0].split(',');
        const result = {};
        matched.forEach(r => {
            const r1 = r.split('&&');
            if (r1) result[r1[0]] = r1[1];
        })
        return result;
    }

    const requestOptionDefaults = {
        method: 'get',
        // baseUrl: location.protocol + '//' + location.host,
        baseUrl/*Test*/: '',
        body: null,
        url: '',
    }
    function request(option = {}) {
        option = Object.assign({}, requestOptionDefaults, option)
        return new Promise((resolve, reject) => {
            switch (option.method) {
                case 'get':
                    window.fetch(option.baseUrl + option.url).then(res => {
                        return res.json();
                    }).then(res => {
                        if (res.status !== 1000) return reject(res.message || res.status);
                        return resolve(res.data);
                    })
                    break;
                default:
                    return;

            }
        })
    }

    const MODULE_NAME = 'mango';
    window[MODULE_NAME] = {
        utils: {
            dataCharsToObj,
        },
        api: {
            request
        }
    }
}(this))