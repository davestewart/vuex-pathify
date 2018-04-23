function footer (hook) {
  var footer = `
    <footer>
    <hr/>
    <span><a href="https://github.com/QingWei-Li">cinwell</a> &copy;2017.</span>
    <span>Proudly published with <a href="https://github.com/QingWei-Li/docsify" target="_blank">docsify</a>.</span>
    </footer>`

  hook.afterEach(function (html) {
    return html + footer
  })
}

/**
 * Fix anchors for all headings with code in them
 *
 * @param hook
 */
function fixAnchors (hook) {

  hook.afterEach(function (html, next) {

    // find all headings and replace them
    html = html.replace(/<(h\d).+?<\/\1>/g, function (html) {

      // create temp node
      var div = document.createElement('div')
      div.innerHTML = html

      // get anchor
      var link = div.querySelector('a[href*="?id"]')

      if (!link) {
        return html
      }

      // work out id
      var text = link.innerText
      var id = text
        .split('(')
        .shift()
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/^-+|-+$/g, '')
      var href = link.getAttribute('href')
        .replace(/\?id=.+/, '?id=' + id)

      // update dom
      link.setAttribute('href', href)
      link.setAttribute('data-id', id)
      link.parentElement.setAttribute('id', id)

      // return html
      return div.innerHTML
    })

    // continue
    next(html)
  })
}
