function getLink (link) {
  if (link instanceof Element) {
    link = link.getAttribute('href')
  }
  var hash = (link.match(/#.+/) || '').toString().replace('#', '').replace(/\?.*/, '')
  return hash || '/'
}

function getLinks () {

  var sidebar = document.querySelector('.sidebar')
  var links = [].slice.call(sidebar.querySelectorAll('a'))
  var current = links.find(link => getLink(link) === getLink(location.href))
  var index = links.indexOf(current)

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
    var links = getLinks()
    var link = links[name]
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
    var links = getLinks()
    if (!links.current) {
      return ''
    }

    var html = ''
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
