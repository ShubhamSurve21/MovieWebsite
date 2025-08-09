import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaLanguage, FaPlay, FaStar, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { fetchDetails, fetchCredits, fetchVideos, getBackdropUrl, getPosterUrl } from '../api/tmdb';

const Details = () => {
  const { mediaType, id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(mediaType, id),
          fetchCredits(mediaType, id),
          fetchVideos(mediaType, id),
        ]);
        if (!mounted) return;
        setItem(detailsData);
        setCast((creditsData?.cast || []).slice(0, 12));
        setVideos(videosData || []);
      } catch (e) {
        if (!mounted) return;
        setError('Failed to load details. Please try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [mediaType, id]);

  const title = useMemo(() => item?.title || item?.name || '', [item]);
  const releaseYear = useMemo(() => {
    const d = item?.release_date || item?.first_air_date;
    return d ? new Date(d).getFullYear() : '';
  }, [item]);
  const rating = useMemo(() => (item?.vote_average ? item.vote_average.toFixed(1) : 'N/A'), [item]);
  const runtime = useMemo(() => {
    if (!item) return null;
    if (mediaType === 'movie') return item.runtime ? `${item.runtime}m` : null;
    if (mediaType === 'tv') return item.episode_run_time?.[0] ? `${item.episode_run_time[0]}m/ep` : null;
    return null;
  }, [item, mediaType]);
  const languages = useMemo(() => (item?.spoken_languages || []).map(l => l.english_name).slice(0, 3).join(', '), [item]);
  const backdrop = useMemo(() => getBackdropUrl(item?.backdrop_path, 'w1280'), [item]);
  const poster = useMemo(() => getPosterUrl(item?.poster_path, 'w500'), [item]);
  const trailer = useMemo(() => {
    return (videos || []).find(v => v.type === 'Trailer' && v.site === 'YouTube');
  }, [videos]);

  const tagline = item?.tagline;
  const genres = item?.genres || [];
  const status = item?.status;
  const homepage = item?.homepage;
  const voteCount = item?.vote_count;
  const releaseDate = item?.release_date || item?.first_air_date;

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
      </section>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero with backdrop */}
      <div className="relative">
        {backdrop && (
          <div className="absolute inset-0">
            <img src={backdrop} alt="backdrop" className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />
          </div>
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white transition">
            <FaArrowLeft className="mr-2" /> Back
          </button>

          {/* Title block over hero */}
          <div className="mt-16 sm:mt-20">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
              {title} {releaseYear && <span className="font-normal text-white/80">({releaseYear})</span>}
            </h1>
            {tagline ? (
              <p className="mt-3 text-white/80 italic max-w-3xl">{tagline}</p>
            ) : null}

            {/* Quick stats chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {rating && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-400/30"><FaStar className="mr-1" /> {rating} {voteCount ? `(${voteCount})` : ''}</span>
              )}
              {runtime && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20"><FaClock className="mr-1" /> {runtime}</span>
              )}
              {releaseDate && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20"><FaCalendarAlt className="mr-1" /> {releaseDate}</span>
              )}
              {languages && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20"><FaLanguage className="mr-1" /> {languages}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-20">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200/70 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0">
            {/* Poster (sticky on desktop) */}
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60">
              <div className="sticky top-6">
                <img src={poster} alt={title} className="rounded-xl w-full object-cover shadow-xl ring-1 ring-black/5" />
                {genres?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {genres.map((g) => (
                      <span key={g.id} className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200/60 dark:border-blue-800/60">{g.name}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 lg:p-8">
              {/* Overview */}
              {item?.overview && (
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-[15px]">{item.overview}</p>
              )}

              {/* CTA row */}
              <div className="mt-5 flex flex-wrap gap-3">
                {trailer ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow transition"
                  >
                    <FaPlay className="mr-2" /> Watch Trailer
                  </a>
                ) : null}
                {homepage ? (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-900/10"
                  >
                    Official Site
                  </a>
                ) : null}
              </div>

              {/* Key facts grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {status ? (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">Status</div>
                    <div className="mt-1 font-semibold">{status}</div>
                  </div>
                ) : null}
                {mediaType === 'movie' && item?.budget ? (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">Budget</div>
                    <div className="mt-1 font-semibold">${(item.budget).toLocaleString()}</div>
                  </div>
                ) : null}
                {mediaType === 'movie' && item?.revenue ? (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">Revenue</div>
                    <div className="mt-1 font-semibold">${(item.revenue).toLocaleString()}</div>
                  </div>
                ) : null}
                {mediaType === 'tv' && item?.number_of_seasons ? (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">Seasons</div>
                    <div className="mt-1 font-semibold">{item.number_of_seasons}</div>
                  </div>
                ) : null}
                {mediaType === 'tv' && item?.number_of_episodes ? (
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-900/50">
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">Episodes</div>
                    <div className="mt-1 font-semibold">{item.number_of_episodes}</div>
                  </div>
                ) : null}
              </div>

              {/* Cast */}
              {cast?.length ? (
                <div className="mt-10">
                  <h2 className="text-lg font-semibold mb-4">Top Billed Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {cast.map((person) => (
                      <div key={person.id} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition">
                        <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800">
                          {person.profile_path ? (
                            <img src={getPosterUrl(person.profile_path, 'w342')} alt={person.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FaUser className="text-2xl" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-semibold truncate" title={person.name}>{person.name}</div>
                          <div className="text-xs text-gray-500 truncate" title={person.character}>{person.character}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
