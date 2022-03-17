function getLink (link) {
  if (link instanceof Element) {
    link = link.getAttribute('href')
  }
  const hash = (link.match(/#.+/) || '').toString().replace('#', '').replace(/\?.*/, '')
  return hash || '/'
}

function getLinks () {

  const sidebar = document.querySelector('.sidebar')
  const links = [].slice.call(sidebar.querySelectorAll('a'))
  const current = links.find(link => getLink(link) === getLink(location.href))
  const index = links.indexOf(current)

  return {
    length: links.length,
    current: current,
    index: index,
    prev: links[index - 1],
    next: links[index + 1],
  }
}

function pageNav (hook) {

  function navigate (name) {
    const links = getLinks()
    const link = links[name]
    if (link) {
      window.location.hash = getLink(link)
    }
  }

  hook.init (function () {
    window.addEventListener('keydown', function (event) {
      if (!event.ctrlKey && !event.metaKey) {
        if (event.keyCode === 37) {
          navigate('prev')
        }
        if (event.keyCode === 39) {
          navigate('next')
        }
      }
    })
  })

}

function pageLinks (hook) {

  function makeLinks () {
    const links = getLinks()
    if (!links.current) {
      return ''
    }

    let html = ''
    if (links.prev) {
      html += '<span class="guide-link-prev">' +links.prev.outerHTML+ '</span>'
    }
    if (links.next) {
      html += '<span class="guide-link-next">' +links.next.outerHTML+ '</span>'
    }

    return html
  }

  hook.afterEach(function (html, next) {
    next(html + '<div class="guide-links">' +makeLinks()+ '</div>')
  })

  hook.ready(function () {
    document.querySelector('.guide-links').innerHTML = makeLinks()
  })

}

/**
 * Fix anchors for all headings with code / methods
 *
 * @example:
 *
 *  - from: sync(path: string)
 *  - to: sync
 *
 * @param hook
 */
function fixAnchors (hook) {

  hook.afterEach(function (html, next) {

    // find all headings and replace them
    html = html.replace(/<(h\d).+?<\/\1>/g, function (html) {

      // create temp node
      const div = document.createElement('div')
      div.innerHTML = html

      // get anchor
      const link = div.querySelector('a[href*="?id"]')
      if (!link) {
        return html
      }

      // get id
      const matches = link.getAttribute('href').match(/id=(.+)/)
      let id = matches[1]

      // clean up ids unless element has `anchor` class (meaning it was manually-entered HTML)
      if (!link.classList.contains('anchor')) {
        id = link.innerText
          .split('(')
          .shift()
          .toLowerCase()
          .replace(/\W+/g, '-')
          .replace(/^-+|-+$/g, '')
        const href = link.getAttribute('href').replace(/\?id=.+/, '?id=' + id)
        link.setAttribute('href', href)
      }

      // update dom
      link.setAttribute('data-id', id)
      link.parentElement.setAttribute('id', id)

      // return html
      return div.innerHTML
    })

    // continue
    next(html)
  })
}
