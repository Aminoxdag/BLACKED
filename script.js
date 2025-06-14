document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '919573d0eb2fba2a862969dbfb5acbde';
    const siteHeader = document.getElementById('siteHeader');
    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');
    const loading = document.getElementById('loading');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalBackground = document.getElementById('modalBackground');
    const modalTitle = document.getElementById('modalTitle');
    const modalInfo = document.getElementById('modalInfo');
    const closeModal = document.querySelector('.close');
    const previewModal = document.getElementById('previewModal');
    const previewImage = document.getElementById('previewImage');
    const previewClose = document.getElementById('previewClose');
    const previewModalContent = document.querySelector('.preview-modal-content');
    const loadMoreTrigger = document.getElementById('loadMoreTrigger');
    const openingSlide = document.getElementById('openingSlide');
    const mainContainer = document.getElementById('mainContainer');
    const enterBtn = document.getElementById('enterBtn');
    const ageVerification = document.getElementById('ageVerification');
    const ageYes = document.getElementById('ageYes');
    const ageNo = document.getElementById('ageNo');
    const infoBtn = document.getElementById('infoBtn');
    const infoModal = document.getElementById('infoModal');
    const infoClose = document.getElementById('infoClose');
    const contactBtn = document.getElementById('contactBtn');
    const dmcaBtn = document.getElementById('dmcaBtn');
    const contactModal = document.getElementById('contactModal');
    const dmcaModal = document.getElementById('dmcaModal');
    const contactClose = document.getElementById('contactClose');
    const dmcaClose = document.getElementById('dmcaClose');
    const heroBanner = document.getElementById('heroBanner');
    const heroTitle = document.getElementById('heroTitle');
    const progressBarFill = document.getElementById('progressBarFill');
    const backToTop = document.getElementById('backToTop');
    let allMovies = [];
    let displayedMovies = [];
    let currentHeroMovie = null;
    let previousHeroMovie = null;
    const moviesPerPage = 10;
    let currentIndex = 0;
    let isSearching = false;
    let lastScrollPosition = 0;
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isSwiping = false;
    const swipeThreshold = 100;
    const collectionIds = [
        '1082372', '958404', '1082482', '1061726', '1060979', '1074866', '1471192',
        '1297274', '1080378', '1309224', '1208587', '1075180', '1080317', '1061796',
        '1082476', '1075166', '1082479', '1072340', '1072451', '1072446', '1079123',
        '1077447', '1077561', '1095467', '1134818', '1072707', '1113625', '1124595',
        '1076849', '1142983', '1143352', '1072914', '1073724', '1074862', '1082473',
        '1084761', '1082893'
    ];
    const collectionVideoLinks = {
        'Black & White 12': 'https://pomf2.lain.la/f/tsotmqs.mp4',
        'Baddies 7': 'https://video.twimg.com/amplify_video/1913259097123627008/vid/avc1/1280x720/uaeyMCjhFoE_P-AW.mp4?tag=14',
        'Ignite 8': 'https://video.twimg.com/amplify_video/1748776009384493056/vid/avc1/1280x720/i0PwhQVgo65KidID.mp4?tag=14',
        'Blacked Raw V88': 'https://video.twimg.com/amplify_video/1808113431511240704/vid/avc1/1920x1080/BLzs8p9tB8yUjxYy.mp4?tag=16',
        'Interracial & Anal 2': 'https://pomf2.lain.la/f/14am6g5e.mp4',
        'Black & White 10': 'https://pomf2.lain.la/f/bwpcb47u.mp4'
    };
    const additionalMovieIds = [
        { id: '1437251', videoUrl: 'https://example.com/video1.mp4' },
        { id: 'https://www.themoviedb.org/movie/1437251-level-up-4', videoUrl: '' },
        { id: '487398', videoUrl: '' },
        { id: 'https://www.themoviedb.org/movie/487398-interracial-orgies', videoUrl: '' }
    ];
    const backgroundVideoSources = [
        "https://pomf2.lain.la/f/6z6vdjly.mp4",
        "https://pomf2.lain.la/f/xbe53sek.mp4",
        "https://pomf2.lain.la/f/gtccmsf3.mp4",
        "https://pomf2.lain.la/f/jmwyhgvp.mp4",
        "https://pomf2.lain.la/f/smxo1rw5.mp4"
    ];
    const customMovies = [
        {
            id: 'custom-1',
            title: 'Preppy Teen Experience Big Black Cock! Part 1',
            posters: ['https://pomf2.lain.la/f/fg8s0wkn.jpg'],
            backdrops: ['https://via.placeholder.com/780x439?text=Custom+Backdrop'],
            release_date: '2023-01-15',
            runtime: 120,
            overview: 'This is a custom movie added manually without TMDB.',
            production_companies: [{ name: 'Custom Productions' }],
            cast: [
                { name: 'Megan Rain', profile_path: 'https://media.themoviedb.org/t/p/w375_and_h375_face/mPodzD0OrXizrGCFduYFUUsGxMB.jpg' },
                { name: 'Actor Two', profile_path: 'https://via.placeholder.com/45x45?text=A2' }
            ],
            videoUrl: 'https://pomf2.lain.la/f/5d3wuavj.mp4'
        },
        {
            id: 'custom-2',
            title: 'Loaned By Daddy',
            posters: ['https://pomf2.lain.la/f/cpeu57qt.jpg'],
            backdrops: ['https://via.placeholder.com/780x439?text=Backdrop+2'],
            release_date: '2017',
            runtime: 35,
            overview: 'A thrilling sequel to the custom movie series.',
            production_companies: [{ name: 'Blacked' }],
            cast: [
                { name: 'Kendra Sunderland', profile_path: 'https://media.themoviedb.org/t/p/w375_and_h375_face/dGEZ66POPTintTX5TmjAk6qwfab.jpg' }
            ],
            videoUrl: 'https://pomf2.lain.la/f/5d8kljoq.mp4'
        },
        {
            id: 'custom-3',
            title: 'Brakes Adventures Return',
            posters: ['https://images2.imgbox.com/c8/f7/7xn1cPI6_o.jpg'],
            backdrops: ['https://via.placeholder.com/780x439?text=Backdrop+2'],
            release_date: '2017',
            runtime: 35,
            overview: 'A thrilling sequel to the custom movie series.',
            production_companies: [{ name: 'Blacked' }],
            cast: [
                { name: 'Valentina Nappi', profile_path: 'https://media.themoviedb.org/t/p/w375_and_h375_face/6ryqzX4tlcUdqXjMDnjdn3lyNX8.jpg' }
            ],
            videoUrl: 'https://video.twimg.com/amplify_video/1746386975853010945/vid/avc1/1920x1080/bxHlCJdMJIQOCXIg.mp4?tag=16'
        },
        {
            id: 'custom-4',
            title: 'Crushin 3',
            posters: ['https://images2.imgbox.com/e9/e8/RZOYbZLQ_o.jpg'],
            backdrops: ['https://via.placeholder.com/780x439?text=Backdrop+2'],
            release_date: '2022',
            runtime: 35,
            overview: 'A thrilling sequel to the custom movie series.',
            production_companies: [{ name: 'Blacked' }],
            cast: [
                { name: 'Kylie Rocket', profile_path: 'https://media.themoviedb.org/t/p/w375_and_h375_face/8SLjj6EPXDvucXkrjboYBIMMsvW.jpg' }
            ],
            videoUrl: 'https://video.twimg.com/amplify_video/1702107196421496832/vid/avc1/1920x1080/wft86vTm-tUmRfDG.mp4?tag=16'
        }

    ];
    const isAgeVerified = localStorage.getItem('ageVerified');
    if (isAgeVerified === 'true') {
        ageVerification.classList.add('hidden');
        openingSlide.classList.remove('hidden');
        siteHeader.classList.remove('visible');
    } else {
        ageVerification.classList.remove('hidden');
        openingSlide.classList.add('hidden');
        mainContainer.classList.remove('visible');
        siteHeader.classList.remove('visible');
    }
    ageYes.addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        ageVerification.classList.add('hidden');
        openingSlide.classList.remove('hidden');
        siteHeader.classList.remove('visible');
    });
    ageNo.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });
    enterBtn.addEventListener('click', () => {
        openingSlide.classList.add('hidden');
        mainContainer.classList.add('visible');
        siteHeader.classList.add('visible');
        fetchCollectionMovies();
    });
    infoBtn.addEventListener('click', () => {
        infoModal.style.display = 'flex';
        infoClose.focus();
    });
    infoClose.addEventListener('click', () => {
        infoModal.style.display = 'none';
        infoBtn.focus();
        updateBackToTopVisibility();
    });
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.style.display = 'none';
            infoBtn.focus();
            updateBackToTopVisibility();
        }
    });
    contactBtn.addEventListener('click', () => {
        contactModal.style.display = 'flex';
        contactClose.focus();
    });
    contactClose.addEventListener('click', () => {
        contactModal.style.display = 'none';
        contactBtn.focus();
        updateBackToTopVisibility();
    });
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
            contactBtn.focus();
            updateBackToTopVisibility();
        }
    });
    dmcaBtn.addEventListener('click', () => {
        dmcaModal.style.display = 'flex';
        dmcaClose.focus();
    });
    dmcaClose.addEventListener('click', () => {
        dmcaModal.style.display = 'none';
        dmcaBtn.focus();
        updateBackToTopVisibility();
    });
    dmcaModal.addEventListener('click', (e) => {
        if (e.target === dmcaModal) {
            dmcaModal.style.display = 'none';
            dmcaBtn.focus();
            updateBackToTopVisibility();
        }
    });
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            filterMovies('');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display === 'flex') {
                stopModalVideo();
                modal.style.display = 'none';
                window.scrollTo(0, lastScrollPosition);
                updateBackToTopVisibility();
            }
            if (previewModal.style.display === 'flex') {
                previewModalContent.style.transform = 'translateY(0)';
                previewModal.style.display = 'none';
                updateBackToTopVisibility();
            }
            if (infoModal.style.display === 'flex') {
                infoModal.style.display = 'none';
                infoBtn.focus();
                updateBackToTopVisibility();
            }
            if (contactModal.style.display === 'flex') {
                contactModal.style.display = 'none';
                contactBtn.focus();
                updateBackToTopVisibility();
            }
            if (dmcaModal.style.display === 'flex') {
                dmcaModal.style.display = 'none';
                dmcaBtn.focus();
                updateBackToTopVisibility();
            }
        }
    });
    previewModalContent.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
        previewModalContent.style.transition = 'none';
    });
    previewModalContent.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        touchCurrentY = e.touches[0].clientY;
        const deltaY = touchCurrentY - touchStartY;
        previewModalContent.style.transform = `translateY(${deltaY}px)`;
    });
    previewModalContent.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        const deltaY = touchCurrentY - touchStartY;
        previewModalContent.style.transition = 'transform 0.3s ease';
        if (Math.abs(deltaY) > swipeThreshold) {
            previewModalContent.style.transform = `translateY(${deltaY > 0 ? '100vh' : '-100vh'})`;
            setTimeout(() => {
                previewModal.style.display = 'none';
                previewModalContent.style.transform = 'translateY(0)';
                updateBackToTopVisibility();
            }, 300);
        } else {
            previewModalContent.style.transform = 'translateY(0)';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function updateBackToTopVisibility() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        if (modal.style.display === 'flex' || previewModal.style.display === 'flex') {
            backToTop.classList.remove('visible');
            return;
        }
        if (scrollPosition > 200 && scrollPosition < documentHeight - windowHeight - 100) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', updateBackToTopVisibility);
    window.addEventListener('resize', updateBackToTopVisibility);
    document.addEventListener('DOMContentLoaded', updateBackToTopVisibility);
    function extractMovieIdFromUrl(entry) {
        if (typeof entry === 'object') {
            const match = entry.id.match(/\/movie\/(\d+)/);
            return match ? match[1] : entry.id;
        }
        const match = entry.match(/\/movie\/(\d+)/);
        return match ? match[1] : entry;
    }
    async function fetchMovieImages(movieId) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
            );
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return {
                posters: data.posters.map(p => `https://media.themoviedb.org/t/p/w342${p.file_path}`),
                backdrops: data.backdrops.map(b => `https://media.themoviedb.org/t/p/w780${b.file_path}`)
            };
        } catch (error) {
            console.error(`Failed to fetch images for movie ${movieId}:`, error);
            return { posters: [], backdrops: [] };
        }
    }
    async function fetchMovieById(movieId, videoUrl = '') {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const detailsResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
                { signal: controller.signal }
            );
            if (!detailsResponse.ok) throw new Error(`HTTP error! status: ${detailsResponse.status}`);
            const detailsData = await detailsResponse.json();
            const creditsResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
                { signal: controller.signal }
            );
            if (!creditsResponse.ok) throw new Error(`HTTP error! status: ${creditsResponse.status}`);
            const creditsData = await creditsResponse.json();
            const images = await fetchMovieImages(movieId);
            clearTimeout(timeoutId);
            return {
                ...detailsData,
                posters: images.posters.length > 0 ? images.posters : [`https://media.themoviedb.org/t/p/w342${detailsData.poster_path || ''}`],
                backdrops: images.backdrops.length > 0 ? images.backdrops : [`https://media.themoviedb.org/t/p/w780${detailsData.backdrop_path || ''}`],
                cast: creditsData.cast.slice(0, 3),
                videoUrl: videoUrl
            };
        } catch (error) {
            console.error(`Failed to fetch movie ${movieId}:`, error);
            return null;
        }
    }
    async function fetchCollectionMovies() {
        loading.classList.add('active');
        try {
            const collectionPromises = collectionIds.map(async (id) => {
                const response = await fetch(
                    `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}`
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                const moviePromises = data.parts.map(async (movie) => {
                    const detailsResponse = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
                    );
                    if (!detailsResponse.ok) throw new Error(`HTTP error! status: ${detailsResponse.status}`);
                    const detailsData = await detailsResponse.json();
                    const creditsResponse = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
                    );
                    if (!creditsResponse.ok) throw new Error(`HTTP error! status: ${creditsResponse.status}`);
                    const creditsData = await creditsResponse.json();
                    const images = await fetchMovieImages(movie.id);
                    const videoUrl = collectionVideoLinks[movie.title] || '';
                    return {
                        ...movie,
                        runtime: detailsData.runtime,
                        production_companies: detailsData.production_companies,
                        posters: images.posters.length > 0 ? images.posters : [`https://media.themoviedb.org/t/p/w342${movie.poster_path || ''}`],
                        backdrops: images.backdrops.length > 0 ? images.backdrops : [`https://media.themoviedb.org/t/p/w780${movie.backdrop_path || ''}`],
                        cast: creditsData.cast.slice(0, 3),
                        videoUrl: videoUrl
                    };
                });
                const movies = await Promise.all(moviePromises);
                const validMovies = movies.filter(movie => movie && movie.posters.length > 0 && movie.backdrops.length > 0);
                displayResults(validMovies, true);
                displayedMovies = [...displayedMovies, ...validMovies];
                return movies;
                
            });
            const allCollections = await Promise.all(collectionPromises);
            const collectionMovies = allCollections.flat().filter(movie => 
                movie && movie.posters.length > 0 && movie.backdrops.length > 0
            );
            const additionalMoviePromises = additionalMovieIds.map(async (entry) => {
                const movieId = extractMovieIdFromUrl(entry);
                const videoUrl = entry.videoUrl || '';
                return await fetchMovieById(movieId, videoUrl);
            });
            const additionalMovies = (await Promise.all(additionalMoviePromises))
                .filter(movie => movie && movie.posters.length > 0 && movie.backdrops.length > 0);
            allMovies = [...displayedMovies, ...additionalMovies, ...customMovies];
            localStorage.setItem('cachedMovies', JSON.stringify(allMovies));
            allMovies.sort((a, b) => (b.videoUrl && b.videoUrl !== '' ? 1 : 0) - (a.videoUrl && a.videoUrl !== '' ? 1 : 0));
            if (allMovies.length === 0) {
                resultsContainer.innerHTML = '<p>No movies loaded.</p>';
            } else {
                resetAndLoadMovies();
                loadInitialMovies();
                setHeroBanner();
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            resultsContainer.innerHTML = '<p>Error loading movies. Please try again later.</p>';
        } finally {
            loading.classList.remove('active');
            updateBackToTopVisibility();
        }
    }
    function setHeroBanner() {
        const validMovies = allMovies
            .filter(movie => movie.backdrops.length > 0 && !movie.backdrops[0].includes('via.placeholder.com') && movie.title)
            .filter(movie => movie !== previousHeroMovie);
        if (validMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * validMovies.length);
            const newMovie = validMovies[randomIndex];
            previousHeroMovie = currentHeroMovie;
            currentHeroMovie = newMovie;
            heroBanner.classList.add('fading');
            setTimeout(() => {
                const backdropUrl = newMovie.backdrops[0].includes('http') 
                    ? newMovie.backdrops[0] 
                    : `https://media.themoviedb.org/t/p/w1280${newMovie.backdrops[0]}`;
                heroBanner.style.backgroundImage = `url(${backdropUrl})`;
                heroTitle.textContent = newMovie.title;
                heroBanner.classList.remove('fading');
            }, 500);
            startProgressBar();
        } else {
            currentHeroMovie = null;
            heroBanner.classList.add('fading');
            setTimeout(() => {
                heroBanner.style.backgroundImage = 'url(https://via.placeholder.com/1280x720?text=Hero+Banner)';
                heroTitle.textContent = 'Discover Our Collection';
                heroBanner.classList.remove('fading');
            }, 500);
            startProgressBar();
        }
    }
    function startProgressBar() {
        progressBarFill.style.animation = 'none';
        progressBarFill.offsetHeight;
        progressBarFill.style.animation = 'fillBar 30s linear forwards';
    }
    progressBarFill.addEventListener('animationend', () => {
        setHeroBanner();
    });
    function resetAndLoadMovies() {
        currentIndex = 0;
        displayedMovies = [];
        resultsContainer.innerHTML = '';
        heroBanner.classList.remove('hidden');
        loadMoreMovies();
    }
    function loadMoreMovies() {
        if (isSearching) return;
        const nextBatch = allMovies.slice(currentIndex, currentIndex + moviesPerPage);
        displayedMovies = [...displayedMovies, ...nextBatch];
        displayResults(nextBatch, true);
        currentIndex += moviesPerPage;
        loadMoreTrigger.style.display = currentIndex >= allMovies.length ? 'none' : 'block';
        updateBackToTopVisibility();
    }
    function loadInitialMovies() {
        while (currentIndex < allMovies.length && resultsContainer.scrollHeight <= window.innerHeight) {
            loadMoreMovies();
        }
    }
    function displayResults(movies, append = false) {
        if (!append) resultsContainer.innerHTML = '';
        if (!movies || movies.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found.</p>';
            return;
        }
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.tabIndex = 0;
            movieCard.setAttribute('aria-label', `View details for ${movie.title || 'movie'}`);
            const img = document.createElement('img');
            img.src = movie.posters[0]?.includes('http') 
                ? movie.posters[0] 
                : `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.posters[0] || ''}`;
            img.alt = movie.title || 'Movie Poster';
            img.loading = 'lazy';
            img.onerror = () => {
                img.classList.add('error');
                img.src = '';
                img.textContent = 'Image Not Available';
            };
            if (movie.videoUrl && movie.videoUrl !== '') {
                const videoIcon = document.createElement('span');
                videoIcon.className = 'video-icon';
                videoIcon.textContent = 'Video';
                movieCard.appendChild(videoIcon);
            } else {
                const soonIcon = document.createElement('span');
                soonIcon.className = 'soon-icon';
                soonIcon.textContent = 'Soon';
                movieCard.appendChild(soonIcon);
            }
            movieCard.appendChild(img);
            resultsContainer.appendChild(movieCard);
            movieCard.addEventListener('click', () => {
                img.classList.add('clicked');
                setTimeout(() => {
                    img.classList.remove('clicked');
                    showModal(movie);
                }, 200);
            });
            movieCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    img.classList.add('clicked');
                    setTimeout(() => {
                        img.classList.remove('clicked');
                        showModal(movie);
                    }, 200);
                }
            });
        });
    }
    function showModal(movie) {
        if (!movie) return;
        lastScrollPosition = window.scrollY;
        modalImage.src = movie.posters[0]?.includes('http') 
            ? movie.posters[0] 
            : `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.posters[0] || ''}`;
        modalImage.alt = movie.title || 'Movie Poster';
        modalImage.onerror = () => {
            modalImage.classList.add('error');
            modalImage.src = '';
            modalImage.textContent = 'Image Not Available';
        };
        const backgroundUrl = (movie.backdrops && movie.backdrops[0] && !movie.backdrops[0].includes('via.placeholder.com'))
            ? (movie.backdrops[0].includes('http') 
                ? movie.backdrops[0] 
                : `https://media.themoviedb.org/t/p/w1280${movie.backdrops[0]}`)
            : (movie.posters && movie.posters[0]
                ? (movie.posters[0].includes('http') 
                    ? movie.posters[0] 
                    : `https://media.themoviedb.org/t/p/w342${movie.posters[0]}`)
                : 'https://via.placeholder.com/1280x720?text=No+Background');
        modalBackground.style.backgroundImage = `url(${backgroundUrl})`;
        modalTitle.textContent = movie.title || 'Untitled';
        const actorsHtml = (movie.cast || []).map(actor => `
            <div class="actor">
                <img src="${actor.profile_path?.includes('http') 
                    ? actor.profile_path 
                    : `https://media.themoviedb.org/t/p/w45_and_h45_face${actor.profile_path || ''}`}" 
                     alt="${actor.name || 'Actor'}" 
                     class="actor-image" 
                     loading="lazy"
                     onerror="this.classList.add('error'); this.src=''; this.textContent='No Image'">
                <span class="actor-name">${actor.name || 'Unknown'}</span>
            </div>
        `).join('');
        const videoHtml = movie.videoUrl && movie.videoUrl !== '' ? `
            <video width="100%" controls autoplay>
                <source src="${movie.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        ` : '';
        const imagesPerPage = 3;
        let visiblePosters = movie.posters.slice(0, imagesPerPage);
        let visibleBackdrops = movie.backdrops.slice(0, imagesPerPage);
        let posterIndex = imagesPerPage;
        let backdropIndex = imagesPerPage;
        const postersHtml = visiblePosters.map(poster => `
            <img src="${poster}" alt="${movie.title || 'Poster'}" loading="lazy"
                 onerror="this.classList.add('error'); this.src=''; this.textContent='Poster Not Available'">
        `).join('');
        const backdropsHtml = visibleBackdrops.map(backdrop => `
            <img src="${backdrop}" alt="${movie.title || 'Backdrop'}" loading="lazy"
                 onerror="this.classList.add('error'); this.src=''; this.textContent='Backdrop Not Available'">
        `).join('');
        const posterLoadMoreHtml = movie.posters.length > imagesPerPage ? `
            <button class="load-more-btn" id="loadMorePosters" tabindex="0" aria-label="Load more posters">Load More</button>
        ` : '';
        const backdropLoadMoreHtml = movie.backdrops.length > imagesPerPage ? `
            <button class="load-more-btn" id="loadMoreBackdrops" tabindex="0" aria-label="Load more backdrops">Load More</button>
        ` : '';
        modalInfo.innerHTML = `
            ${videoHtml}
            <p><strong>Release Date:</strong> ${movie.release_date || 'N/A'}</p>
            <p><strong>Runtime:</strong> ${movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
            <p><strong>Production:</strong> ${movie.production_companies?.map(p => p.name).join(', ') || 'N/A'}</p>
            <p><strong>Overview:</strong> ${movie.overview || 'No description available.'}</p>
            <div class="gallery-container">
                <h3>Posters</h3>
                <div class="gallery" id="posterGallery">${postersHtml}${posterLoadMoreHtml}</div>
            </div>
            <div class="gallery-container">
                <h3>Backdrops</h3>
                <div class="gallery" id="backdropGallery">${backdropsHtml}${backdropLoadMoreHtml}</div>
            </div>
            <div class="actors-grid">${actorsHtml}</div>
        `;
        if (movie.videoUrl && movie.videoUrl !== '') {
            const videoElement = modalInfo.querySelector('video');
            if (videoElement) {
                videoElement.play().catch(() => {
                    const message = document.createElement('p');
                    message.textContent = 'Autoplay with sound blocked. Click play to start the video.';
                    message.style.color = '#ff5555';
                    message.style.margin = '10px 0';
                    videoElement.parentNode.insertBefore(message, videoElement);
                });
            }
        }
        modal.style.display = 'flex';
        closeModal.focus();
        updateBackToTopVisibility();
        const galleryImages = modalInfo.querySelectorAll('.gallery img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                previewImage.src = img.src;
                previewImage.alt = img.alt;
                previewModal.style.display = 'flex';
                previewClose.focus();
                updateBackToTopVisibility();
            });
        });
        const posterGallery = modalInfo.querySelector('#posterGallery');
        const backdropGallery = modalInfo.querySelector('#backdropGallery');
        const loadMorePostersBtn = modalInfo.querySelector('#loadMorePosters');
        const loadMoreBackdropsBtn = modalInfo.querySelector('#loadMoreBackdrops');
        if (loadMorePostersBtn) {
            loadMorePostersBtn.addEventListener('click', () => {
                const nextPosters = movie.posters.slice(posterIndex, posterIndex + imagesPerPage);
                posterIndex += imagesPerPage;
                nextPosters.forEach(poster => {
                    const img = document.createElement('img');
                    img.src = poster;
                    img.alt = movie.title || 'Poster';
                    img.loading = 'lazy';
                    img.onerror = () => {
                        img.classList.add('error');
                        img.src = '';
                        img.textContent = 'Poster Not Available';
                    };
                    img.addEventListener('click', () => {
                        previewImage.src = img.src;
                        previewImage.alt = img.alt;
                        previewModal.style.display = 'flex';
                        previewClose.focus();
                        updateBackToTopVisibility();
                    });
                    posterGallery.insertBefore(img, loadMorePostersBtn);
                });
                if (posterIndex >= movie.posters.length) {
                    loadMorePostersBtn.remove();
                }
            });
        }
        if (loadMoreBackdropsBtn) {
            loadMoreBackdropsBtn.addEventListener('click', () => {
                const nextBackdrops = movie.backdrops.slice(backdropIndex, backdropIndex + imagesPerPage);
                backdropIndex += imagesPerPage;
                nextBackdrops.forEach(backdrop => {
                    const img = document.createElement('img');
                    img.src = backdrop;
                    img.alt = movie.title || 'Backdrop';
                    img.loading = 'lazy';
                    img.onerror = () => {
                        img.classList.add('error');
                        img.src = '';
                        img.textContent = 'Backdrop Not Available';
                    };
                    img.addEventListener('click', () => {
                        previewImage.src = img.src;
                        previewImage.alt = img.alt;
                        previewModal.style.display = 'flex';
                        previewClose.focus();
                        updateBackToTopVisibility();
                    });
                    backdropGallery.insertBefore(img, loadMoreBackdropsBtn);
                });
                if (backdropIndex >= movie.backdrops.length) {
                    loadMoreBackdropsBtn.remove();
                }
            });
        }
    }
    function stopModalVideo() {
        const videoElement = modalInfo.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }
    closeModal.addEventListener('click', () => {
        stopModalVideo();
        modal.style.display = 'none';
        window.scrollTo(0, lastScrollPosition);
        updateBackToTopVisibility();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            stopModalVideo();
            modal.style.display = 'none';
            window.scrollTo(0, lastScrollPosition);
            updateBackToTopVisibility();
        }
    });
    previewClose.addEventListener('click', () => {
        previewModalContent.style.transform = 'translateY(0)';
        previewModal.style.display = 'none';
        updateBackToTopVisibility();
    });
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModalContent.style.transform = 'translateY(0)';
            previewModal.style.display = 'none';
            updateBackToTopVisibility();
        }
    });
    heroTitle.addEventListener('click', () => {
        if (currentHeroMovie) showModal(currentHeroMovie);
    });
    function filterMovies(query) {
        if (!query) {
            isSearching = false;
            heroBanner.classList.remove('hidden');
            resetAndLoadMovies();
            startProgressBar();
            return;
        }
        isSearching = true;
        heroBanner.classList.add('hidden');
        loadMoreTrigger.style.display = 'none';
        loading.classList.add('active');
        setTimeout(() => {
            const filteredMovies = allMovies.filter(movie => {
                const titleMatch = movie.title?.toLowerCase().includes(query.toLowerCase());
                const actorMatch = movie.cast?.some(actor => 
                    actor.name?.toLowerCase().includes(query.toLowerCase())
                );
                return titleMatch || actorMatch;
            });
            displayResults(filteredMovies);
            loading.classList.remove('active');
            if (filteredMovies.length === 0) {
                resultsContainer.innerHTML = '<p>No results found for "' + query + '".</p>';
            }
            updateBackToTopVisibility();
        }, 300);
    }
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    const debouncedFilter = debounce(filterMovies, 300);
    searchInput.addEventListener('input', (e) => {
        debouncedFilter(e.target.value.trim());
    });
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentIndex < allMovies.length && !isSearching) {
            loadMoreMovies();
        }
    }, { threshold: 0.1 });
    observer.observe(loadMoreTrigger);
    const video = document.getElementById('backgroundVideo');
    let currentVideoIndex = 0;
    function playNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % backgroundVideoSources.length;
        video.src = backgroundVideoSources[currentVideoIndex];
        video.load();
        video.play().catch(error => console.error("Error playing video:", error));
    }
    video.src = backgroundVideoSources[0];
    video.play().catch(error => console.error("Error playing initial video:", error));
    video.addEventListener('ended', playNextVideo);
    video.addEventListener('error', () => {
        console.error("Video error occurred");
        playNextVideo();
    });
});