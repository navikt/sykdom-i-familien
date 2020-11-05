module.exports = {
    sif: {
        key: 'sykdom-i-familien',
        context: 'privatperson',
        path: '/',
    },
    arbeidsgiver: {
        key: 'arbeidsgiver',
        path: '/arbeidsgiver/',
        context: 'arbeidsgiver',
        breadcrumbs: [
            {
                url: 'https://www.nav.no/familie/sykdom-i-familien/arbeidsgiver',
                title: 'Sykdom i familien',
            },
        ],
    },
    samarbeid: {
        key: 'samarbeid',
        path: '/samarbeidspartner/',
        context: 'samarbeidspartner',
        breadcrumbs: [
            {
                url: 'https://www.nav.no/',
                title: 'nav.no',
            },
        ],
    },
};
