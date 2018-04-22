(function () {

    // tracking id
    var id = 'UA-603607-18';

    // add script
    document.write('<script id="ga" async src="https://www.googletagmanager.com/gtag/js?id=' +id+ '"></script>\n')

    // track on load
    document
        .getElementById('ga')
        .addEventListener('load', function () {
            window.dataLayer = window.dataLayer || [];
            function gtag () { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', id);
        });

}());
