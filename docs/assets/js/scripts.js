function footer (hook) {
  var footer = [
    '<hr/>',
    '<footer>',
    '<span><a href="https://github.com/QingWei-Li">cinwell</a> &copy;2017.</span>',
    '<span>Proudly published with <a href="https://github.com/QingWei-Li/docsify" target="_blank">docsify</a>.</span>',
    '</footer>'
  ].join('')

  hook.afterEach(function (html) {
    return html + footer
  })
}
