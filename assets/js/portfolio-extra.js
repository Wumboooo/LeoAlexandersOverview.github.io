(function () {
	var bar = document.getElementById('progress');
	addEventListener('scroll', function () {
		var h = document.documentElement;
		bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
	});

	// reveal on scroll + count-up stats
	var io = new IntersectionObserver(function (es) {
		es.forEach(function (e) {
			if (!e.isIntersecting) return;
			io.unobserve(e.target);
			e.target.classList.add('in');
			e.target.querySelectorAll('[data-count]').forEach(function (n) {
				var t = +n.dataset.count, s = performance.now();
				(function f(now) {
					var p = Math.min((now - s) / 1200, 1);
					n.textContent = Math.round(t * p).toLocaleString() + (p < 1 ? '' : (n.dataset.suffix || ''));
					if (p < 1) requestAnimationFrame(f);
				})(s);
			});
		});
	}, { threshold: 0.2 });
	document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });

	// filters
	var cards = document.querySelectorAll('.card');
	document.querySelectorAll('.filters button').forEach(function (b) {
		b.addEventListener('click', function () {
			document.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('on'); });
			b.classList.add('on');
			cards.forEach(function (c) {
				c.classList.toggle('hide', b.dataset.f !== 'all' && c.dataset.tags.split(' ').indexOf(b.dataset.f) < 0);
			});
		});
	});

	// lightbox
	var lb = document.getElementById('lb'), li = lb.querySelector('img');
	document.querySelectorAll('.card img').forEach(function (i) {
		i.addEventListener('click', function () { li.src = i.src; lb.classList.add('open'); });
	});
	lb.addEventListener('click', function () { lb.classList.remove('open'); });
	addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });

	// theme toggle (remembered)
	try { if (localStorage.getItem('light') === '1') document.body.classList.add('light-mode'); } catch (e) {}
	document.getElementById('themeToggle').addEventListener('click', function () {
		var on = document.body.classList.toggle('light-mode');
		try { localStorage.setItem('light', on ? '1' : '0'); } catch (e) {}
	});
})();

// sakura petals for the contact scene
(function () {
	var box = document.getElementById('petals');
	if (!box || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	for (var i = 0; i < 22; i++) {
		var p = document.createElement('i');
		p.style.left = Math.random() * 100 + '%';
		p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
		p.style.animationDuration = (9 + Math.random() * 9) + 's';
		p.style.animationDelay = (-Math.random() * 18) + 's';
		p.style.transform = 'scale(' + (0.6 + Math.random() * 0.9) + ')';
		box.appendChild(p);
	}
})();
