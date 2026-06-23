// app.js — shared utilities for CA State Parks Pass site

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getParkById(id) {
  return PARKS.find(p => p.id === id) || null;
}

function getTripById(id) {
  return TRIPS.find(t => t.id === id) || null;
}

function getParksForTrip(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return [];
  return trip.parkIds.map(id => getParkById(id)).filter(Boolean);
}

function regionColor(region) {
  return REGION_COLORS[region] || '#888';
}

function ratingStars(rating) {
  if (!rating) return '';
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  let s = '';
  for (let i = 0; i < full; i++) s += '★';
  if (half) s += '½';
  return `<span style="color:#b8860b">${s}</span> <span style="font-size:0.85em;color:#888">${rating}</span>`;
}

function warningBanner(text) {
  if (!text) return '';
  return `<div class="warning-banner">⚠️ <span>${text}</span></div>`;
}

function tripTypeBadge(type) {
  const cls = type === 'Day Trip' ? 'badge-daytrip' : 'badge-roadtrip';
  return `<span class="badge ${cls}">${type}</span>`;
}

function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
}

function renderNav() {
  return `
    <nav>
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">🌲 CA State Parks <span>Pass</span></a>
        <a href="index.html">Home</a>
        <a href="parks.html">Parks</a>
        <a href="trips.html">Trips</a>
      </div>
    </nav>`;
}

function renderFooter() {
  return `
    <footer>
      <p>California State Parks Pass · 32 parks</p>
      <p style="margin-top:0.4rem"><a href="https://www.parks.ca.gov" target="_blank" rel="noopener">parks.ca.gov</a> · <a href="https://www.reservecalifornia.com" target="_blank" rel="noopener">ReserveCalifornia.com</a></p>
    </footer>`;
}

// Visited parks — stored in localStorage as array of park IDs
function getVisited() {
  try { return JSON.parse(localStorage.getItem('ca-parks-visited') || '[]'); } catch { return []; }
}
function setVisited(arr) {
  localStorage.setItem('ca-parks-visited', JSON.stringify(arr));
}
function isVisited(id) {
  return getVisited().includes(id);
}
function toggleVisited(id) {
  const v = getVisited();
  const idx = v.indexOf(id);
  if (idx === -1) v.push(id); else v.splice(idx, 1);
  setVisited(v);
  return idx === -1; // true = now visited
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
});
