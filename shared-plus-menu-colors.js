// Shared Plus Menu Color Enhancement for Noor App
// This script colorizes plus menu icons with individual colors
(function() {
  var colorMap = {
    'duaa': { color: '#14b8a6', r: 20, g: 184, b: 166 },
    'profile': { color: '#3b82f6', r: 59, g: 130, b: 246 },
    'hadith': { color: '#8b5cf6', r: 139, g: 92, b: 246 },
    'history': { color: '#f59e0b', r: 245, g: 158, b: 11 },
    'calendar': { color: '#ef4444', r: 239, g: 68, b: 68 },
    'challenges': { color: '#ec4899', r: 236, g: 72, b: 153 },
    'names': { color: '#d4af55', r: 212, g: 175, b: 85 },
    'media': { color: '#4ecca3', r: 78, g: 204, b: 163 }
  };

  var labelMap = {
    'Du3aa': 'duaa',
    'Profil': 'profile',
    'Hadith': 'hadith',
    'Histoire': 'history',
    'Calendrier': 'calendar',
    'Defis': 'challenges',
    '99 Noms': 'names',
    'Medias': 'media'
  };

  function applyColors() {
    // Find all plus menu overlay containers
    var overlay = document.getElementById('plusMenuOverlay');
    if (!overlay) return;

    var links = overlay.querySelectorAll('a');
    links.forEach(function(link) {
      var spans = link.querySelectorAll('span');
      if (spans.length === 0) return;
      var label = spans[spans.length - 1].textContent.trim();
      var key = labelMap[label];
      if (!key) return;
      var c = colorMap[key];
      if (!c) return;

      // Update circle div
      var circleDiv = link.querySelector('div');
      if (circleDiv) {
        circleDiv.style.background = 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0.08)';
        circleDiv.style.border = '1.5px solid rgba(' + c.r + ',' + c.g + ',' + c.b + ',0.2)';
        // Remove any gradient background
        circleDiv.style.backgroundImage = 'none';
      }

      // Update SVG stroke
      var svg = link.querySelector('svg');
      if (svg) {
        svg.setAttribute('stroke', c.color);
        // Update all child elements that might have stroke
        var paths = svg.querySelectorAll('path, circle, rect, line, polyline, polygon');
        paths.forEach(function(el) {
          if (el.getAttribute('stroke') || el.style.stroke) {
            // Don't override if it's explicitly set to none
            if (el.getAttribute('stroke') !== 'none') {
              el.setAttribute('stroke', c.color);
            }
          }
        });
      }

      // Update label color
      var span = spans[spans.length - 1];
      span.style.color = c.color;
      span.style.webkitTextFillColor = c.color;
      span.style.backgroundImage = 'none';
      span.style.webkitBackgroundClip = 'unset';
    });
  }

  // Apply on load and also observe for dynamic menu opening
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyColors);
  } else {
    applyColors();
  }

  // Also re-apply when overlay becomes visible
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        var overlay = document.getElementById('plusMenuOverlay');
        if (overlay && overlay.style.display === 'flex') {
          setTimeout(applyColors, 50);
        }
      }
    });
  });

  var overlay = document.getElementById('plusMenuOverlay');
  if (overlay) {
    observer.observe(overlay, { attributes: true });
  }
})();
