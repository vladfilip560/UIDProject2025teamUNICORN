import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import './activities.css';

// Local data store (modes -> datasetKey -> days -> activities)
// We include datasets for single preferences and two combinations: 'Adventure|Culture' and 'Relaxation|Sports'
// Each dataset contains 5 days and each activity has environment: 'indoor' | 'outdoor' | 'both'
const DATA = {
  relaxed: {
    'Adventure': [
      { day: 'Day 1', activities: [{ id: 'ra1', name: 'Soft Trek to Temple', description: 'Short, scenic trek.', tags: ['Adventure'], environment: 'outdoor', items: ['Hiking boots', 'Water bottle'], wear: 'Sporty casual' }, { id: 'ra1b', name: 'Local Market Stroll', description: 'Explore stalls.', tags: ['Adventure','Culture'], environment: 'both', items: ['Hat'], wear: 'Casual' }] },
      { day: 'Day 2', activities: [{ id: 'ra2', name: 'Bike Valley', description: 'Easy bike trail.', tags: ['Adventure','Sports'], environment: 'outdoor', items: ['Helmet','Water bottle'], wear: 'Activewear' }, { id: 'ra2b', name: 'Tea House Visit', description: 'Traditional tea tasting.', tags: ['Culture'], environment: 'indoor', items: ['Light jacket'], wear: 'Smart casual' }] },
      { day: 'Day 3', activities: [{ id: 'ra3', name: 'Vineyard Walk', description: 'Relaxed vineyard walk.', tags: ['Relaxation'], environment: 'outdoor', items: ['Sunglasses'], wear: 'Smart casual' }] },
      { day: 'Day 4', activities: [{ id: 'ra4', name: 'Cooking Demo', description: 'Local cooking demo.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'ra5', name: 'Slow Museum Tour', description: 'Curated collection.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ],
    'Culture': [
      { day: 'Day 1', activities: [{ id: 'rc1', name: 'Temple Ceremony', description: 'Attend temple ceremony.', tags: ['Culture'], environment: 'outdoor', items: ['Modest clothing'], wear: 'Conservative' }, { id: 'rc1b', name: 'Local Art Walk', description: 'Guided art walk.', tags: ['Culture'], environment: 'both', items: ['Camera'], wear: 'Smart casual' }] },
      { day: 'Day 2', activities: [{ id: 'rc2', name: 'Gallery Tour', description: 'Private gallery visits.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Smart casual' }] },
      { day: 'Day 3', activities: [{ id: 'rc3', name: 'Historic Neighborhood Walk', description: 'Historic sites tour.', tags: ['Culture','Adventure'], environment: 'outdoor', items: ['Comfortable shoes'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'rc4', name: 'Cooking Class', description: 'Cultural cooking class.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'rc5', name: 'Museum Highlights', description: 'Top exhibits.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ],
    'Relaxation': [
      { day: 'Day 1', activities: [{ id: 'rr1', name: 'Park Picnic', description: 'Relax at the park.', tags: ['Relaxation'], environment: 'outdoor', items: ['Blanket'], wear: 'Casual' }] },
      { day: 'Day 2', activities: [{ id: 'rr2', name: 'Spa Session', description: 'Local spa visit.', tags: ['Relaxation'], environment: 'indoor', items: ['Swimwear'], wear: 'Relaxed' }] },
      { day: 'Day 3', activities: [{ id: 'rr3', name: 'Cafe Day', description: 'Cafes and people watching.', tags: ['Relaxation','Culture'], environment: 'both', items: ['Light jacket'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'rr4', name: 'Gardens', description: 'Botanical gardens visit.', tags: ['Relaxation'], environment: 'outdoor', items: ['Sunscreen'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'rr5', name: 'Museum Chill', description: 'Leisure museum time.', tags: ['Relaxation','Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ],
    'Sports': [
      { day: 'Day 1', activities: [{ id: 'rs1', name: 'Light Hike', description: 'Morning hike.', tags: ['Sports'], environment: 'outdoor', items: ['Hiking boots'], wear: 'Activewear' }] },
      { day: 'Day 2', activities: [{ id: 'rs2', name: 'Climbing Wall', description: 'Indoor climbing experience.', tags: ['Sports'], environment: 'indoor', items: ['Grip shoes'], wear: 'Sporty' }] },
      { day: 'Day 3', activities: [{ id: 'rs3', name: 'Kayak', description: 'Half-day kayak.', tags: ['Sports'], environment: 'outdoor', items: ['Swimwear'], wear: 'Quick-dry' }] },
      { day: 'Day 4', activities: [{ id: 'rs4', name: 'Yoga', description: 'Morning yoga session.', tags: ['Relaxation','Sports'], environment: 'both', items: ['Yoga mat'], wear: 'Comfortable activewear' }] },
      { day: 'Day 5', activities: [{ id: 'rs5', name: 'Run & Explore', description: 'Short runs with sight-seeing.', tags: ['Sports','Adventure'], environment: 'outdoor', items: ['Running shoes'], wear: 'Activewear' }] }
    ],
    'Adventure|Culture': [
      { day: 'Day 1', activities: [{ id: 'rac1', name: 'Temple Trek + Ceremony', description: 'Hike to temple then ceremony.', tags: ['Adventure','Culture'], environment: 'outdoor', items: ['Hiking boots','Modest clothing'], wear: 'Sporty conservative' }] },
      { day: 'Day 2', activities: [{ id: 'rac2', name: 'Market & Gallery', description: 'Market in morning, gallery in afternoon.', tags: ['Culture','Adventure'], environment: 'both', items: ['Camera','Hat'], wear: 'Casual' }] },
      { day: 'Day 3', activities: [{ id: 'rac3', name: 'Vineyard Hike', description: 'Mix of walking and tasting.', tags: ['Adventure','Relaxation'], environment: 'outdoor', items: ['Sunglasses'], wear: 'Smart casual' }] },
      { day: 'Day 4', activities: [{ id: 'rac4', name: 'Cooking & Stroll', description: 'Cooking class then stroll.', tags: ['Culture'], environment: 'both', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'rac5', name: 'Museum & Cafe', description: 'Museum morning, cafes afternoon.', tags: ['Culture','Relaxation'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ],
    'Relaxation|Sports': [
      { day: 'Day 1', activities: [{ id: 'rrs1', name: 'Gentle Hike', description: 'Gentle outdoor walk.', tags: ['Relaxation','Sports'], environment: 'outdoor', items: ['Water bottle'], wear: 'Comfortable' }] },
      { day: 'Day 2', activities: [{ id: 'rrs2', name: 'Spa + Yoga', description: 'Relaxing spa then yoga.', tags: ['Relaxation','Sports'], environment: 'indoor', items: ['Swimwear','Yoga mat'], wear: 'Relaxed activewear' }] },
      { day: 'Day 3', activities: [{ id: 'rrs3', name: 'Park Games', description: 'Light sports in park.', tags: ['Sports'], environment: 'outdoor', items: ['Sneakers'], wear: 'Activewear' }] },
      { day: 'Day 4', activities: [{ id: 'rrs4', name: 'Cafe Recovery', description: 'Rest at cafes.', tags: ['Relaxation'], environment: 'indoor', items: ['Light jacket'], wear: 'Casual' }] },
      { day: 'Day 5', activities: [{ id: 'rrs5', name: 'Leisure Swim', description: 'Pool or beach time.', tags: ['Relaxation','Sports'], environment: 'both', items: ['Swimwear'], wear: 'Swim-friendly' }] }
    ],
    'ALL': [
      { day: 'Day 1', activities: [{ id: 'rall1', name: 'Intro Walk', description: 'Orientation walk.', tags: ['Culture','Adventure'], environment: 'both', items: ['Comfortable shoes'], wear: 'Casual' }] },
      { day: 'Day 2', activities: [{ id: 'rall2', name: 'Gallery Visit', description: 'Local art and exhibits.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] },
      { day: 'Day 3', activities: [{ id: 'rall3', name: 'Light Trek', description: 'Short nature walk.', tags: ['Adventure'], environment: 'outdoor', items: ['Hat'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'rall4', name: 'Cooking Class', description: 'Local cooking.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'rall5', name: 'Museum', description: 'Local museum visit.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ]
  },
  active: {
    'Adventure': [
      { day: 'Day 1', activities: [{ id: 'aa1', name: 'Temple Hike', description: 'Longer temple hike.', tags: ['Adventure'], environment: 'outdoor', items: ['Hiking boots'], wear: 'Hiking gear' }, { id: 'aa1b', name: 'Rock Climb Intro', description: 'Beginner climb.', tags: ['Sports','Adventure'], environment: 'indoor', items: ['Grip shoes'], wear: 'Sporty' }] },
      { day: 'Day 2', activities: [{ id: 'aa2', name: 'City Bike Tour', description: 'Active urban biking.', tags: ['Adventure','Sports'], environment: 'outdoor', items: ['Helmet'], wear: 'Activewear' }] },
      { day: 'Day 3', activities: [{ id: 'aa3', name: 'Trail Run', description: 'Morning trail run.', tags: ['Sports'], environment: 'outdoor', items: ['Running shoes'], wear: 'Activewear' }] },
      { day: 'Day 4', activities: [{ id: 'aa4', name: 'Market Dash', description: 'Quick walking tour.', tags: ['Adventure'], environment: 'both', items: ['Comfortable shoes'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'aa5', name: 'Kayak', description: 'Full morning kayak.', tags: ['Sports'], environment: 'outdoor', items: ['Swimwear'], wear: 'Quick-dry' }] }
    ],
    'Culture': [
      { day: 'Day 1', activities: [{ id: 'ac1', name: 'Walking Tour', description: 'Historic city walk.', tags: ['Culture'], environment: 'outdoor', items: ['Hat'], wear: 'Casual' }] },
      { day: 'Day 2', activities: [{ id: 'ac2', name: 'Museum Marathon', description: 'Several museums.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] },
      { day: 'Day 3', activities: [{ id: 'ac3', name: 'Street Food', description: 'Taste local street food.', tags: ['Culture'], environment: 'both', items: ['Coins'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'ac4', name: 'Local Workshop', description: 'Craft workshop.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'ac5', name: 'Performance Night', description: 'Local music night.', tags: ['Culture'], environment: 'indoor', items: ['Evening wear'], wear: 'Smart' }] }
    ],
    'Relaxation': [
      { day: 'Day 1', activities: [{ id: 'ar1', name: 'Gentle Hike', description: 'Low intensity hike.', tags: ['Relaxation','Sports'], environment: 'outdoor', items: ['Water bottle'], wear: 'Comfortable' }] },
      { day: 'Day 2', activities: [{ id: 'ar2', name: 'Spa Afternoon', description: 'Spa treatments.', tags: ['Relaxation'], environment: 'indoor', items: ['Swimwear'], wear: 'Relaxed' }] },
      { day: 'Day 3', activities: [{ id: 'ar3', name: 'Garden Walk', description: 'Leisurely walk.', tags: ['Relaxation'], environment: 'outdoor', items: ['Hat'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'ar4', name: 'Cafe Relax', description: 'Coffee and reading.', tags: ['Relaxation'], environment: 'indoor', items: ['Book'], wear: 'Casual' }] },
      { day: 'Day 5', activities: [{ id: 'ar5', name: 'Lake Swim', description: 'Light swim.', tags: ['Relaxation','Sports'], environment: 'outdoor', items: ['Swimwear'], wear: 'Swim-friendly' }] }
    ],
    'Sports': [
      { day: 'Day 1', activities: [{ id: 'as1', name: 'Trail Run', description: 'Intense trail run.', tags: ['Sports'], environment: 'outdoor', items: ['Running shoes'], wear: 'Activewear' }] },
      { day: 'Day 2', activities: [{ id: 'as2', name: 'Indoor Climbing', description: 'Climbing session.', tags: ['Sports'], environment: 'indoor', items: ['Climbing shoes'], wear: 'Sporty' }] },
      { day: 'Day 3', activities: [{ id: 'as3', name: 'Kayak Trip', description: 'River kayaking.', tags: ['Sports'], environment: 'outdoor', items: ['Waterproof bag'], wear: 'Quick-dry' }] },
      { day: 'Day 4', activities: [{ id: 'as4', name: 'Cycle Sprint', description: 'Fast urban cycling.', tags: ['Sports','Adventure'], environment: 'outdoor', items: ['Helmet'], wear: 'Activewear' }] },
      { day: 'Day 5', activities: [{ id: 'as5', name: 'Fitness Class', description: 'High intensity class.', tags: ['Sports'], environment: 'indoor', items: ['Gym shoes'], wear: 'Sporty' }] }
    ],
    'Adventure|Culture': [
      { day: 'Day 1', activities: [{ id: 'aac1', name: 'Temple Hike & Ceremony', description: 'Hike then join ceremony.', tags: ['Adventure','Culture'], environment: 'outdoor', items: ['Hiking boots'], wear: 'Sporty conservative' }] },
      { day: 'Day 2', activities: [{ id: 'aac2', name: 'Market + Gallery', description: 'Blend of outdoor market and indoor gallery.', tags: ['Culture','Adventure'], environment: 'both', items: ['Camera'], wear: 'Casual' }] },
      { day: 'Day 3', activities: [{ id: 'aac3', name: 'Vineyard Trek', description: 'Walk through vineyards.', tags: ['Adventure','Relaxation'], environment: 'outdoor', items: ['Sunglasses'], wear: 'Smart casual' }] },
      { day: 'Day 4', activities: [{ id: 'aac4', name: 'Cooking & Walk', description: 'Cooking class then stroll.', tags: ['Culture'], environment: 'both', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'aac5', name: 'Museum & Cafe', description: 'Indoor museums and cafe time.', tags: ['Culture','Relaxation'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ],
    'Relaxation|Sports': [
      { day: 'Day 1', activities: [{ id: 'ars1', name: 'Gentle Hike', description: 'Leisurely hike.', tags: ['Relaxation','Sports'], environment: 'outdoor', items: ['Water bottle'], wear: 'Comfortable' }] },
      { day: 'Day 2', activities: [{ id: 'ars2', name: 'Spa + Yoga', description: 'Spa then yoga.', tags: ['Relaxation','Sports'], environment: 'indoor', items: ['Swimwear','Yoga mat'], wear: 'Relaxed activewear' }] },
      { day: 'Day 3', activities: [{ id: 'ars3', name: 'Park Sports', description: 'Casual park activities.', tags: ['Sports'], environment: 'outdoor', items: ['Sneakers'], wear: 'Activewear' }] },
      { day: 'Day 4', activities: [{ id: 'ars4', name: 'Cafe Recovery', description: 'Relax at cafes.', tags: ['Relaxation'], environment: 'indoor', items: ['Light jacket'], wear: 'Casual' }] },
      { day: 'Day 5', activities: [{ id: 'ars5', name: 'Leisure Swim', description: 'Chill swim session.', tags: ['Relaxation','Sports'], environment: 'both', items: ['Swimwear'], wear: 'Swim-friendly' }] }
    ],
    'ALL': [
      { day: 'Day 1', activities: [{ id: 'rall1', name: 'Intro Walk', description: 'Orientation walk.', tags: ['Culture','Adventure'], environment: 'both', items: ['Comfortable shoes'], wear: 'Casual' }] },
      { day: 'Day 2', activities: [{ id: 'rall2', name: 'Gallery Visit', description: 'Local art and exhibits.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] },
      { day: 'Day 3', activities: [{ id: 'rall3', name: 'Light Trek', description: 'Short nature walk.', tags: ['Adventure'], environment: 'outdoor', items: ['Hat'], wear: 'Casual' }] },
      { day: 'Day 4', activities: [{ id: 'rall4', name: 'Cooking Class', description: 'Local cooking.', tags: ['Culture'], environment: 'indoor', items: ['Notebook'], wear: 'Comfortable' }] },
      { day: 'Day 5', activities: [{ id: 'rall5', name: 'Museum', description: 'Local museum visit.', tags: ['Culture'], environment: 'indoor', items: ['Camera'], wear: 'Smart casual' }] }
    ]
  }
};

const PREFS = ['Adventure', 'Culture', 'Relaxation', 'Sports'];

const makeKey = (mode, prefs, environment) => {
  const ps = Array.from(prefs || []).sort().join(',') || 'ALL';
  return `${mode}|${ps}|${environment}`;
};

const Activities = () => {
  const [mode, setMode] = useState('relaxed');
  const [prefs, setPrefs] = useState(new Set(['Adventure', 'Culture']));
  const [environment, setEnvironment] = useState('both'); // 'both' | 'indoor' | 'outdoor'
  const [expanded, setExpanded] = useState(null); // day index
  const [currentItinerary, setCurrentItinerary] = useState([]);
  const [packing, setPacking] = useState([]);
  const [highlights, setHighlights] = useState([]);

  // decide dataset key from selected preferences
  const chooseDatasetKey = (prefsSet) => {
    const has = (p) => prefsSet.has(p);
    if (has('Adventure') && has('Culture')) return 'Adventure|Culture';
    if (has('Relaxation') && has('Sports')) return 'Relaxation|Sports';
    // if exactly one preference selected, return it
    if (prefsSet.size === 1) return Array.from(prefsSet)[0];
    // otherwise default to ALL
    return 'ALL';
  };

  useEffect(() => {
    const datasetKey = chooseDatasetKey(prefs);
    const storageKey = `activities_version_${makeKey(mode, prefs, environment)}`;

    // try to load cached
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      setCurrentItinerary(parsed.itinerary);
      setPacking(parsed.packing);
      setHighlights(parsed.highlights || []);
      return;
    }

    // pick the dataset according to current preferences/combos
    const dataset = (DATA[mode] && DATA[mode][datasetKey]) || DATA[mode]['ALL'];

    const computed = dataset.map(d => {
      const acts = d.activities.filter(a => {
        // environment filter
        if (environment !== 'both' && a.environment !== 'both' && a.environment !== environment) return false;
        // prefs filter: if user has no prefs selected, include all
        if (!prefs || prefs.size === 0) return true;
        // include activity if it matches any selected preference tag
        const matches = a.tags.some(t => prefs.has(t));
        return matches;
      });
      return { day: d.day, activities: acts.length ? acts : d.activities, fallback: acts.length === 0 };
    });

    // aggregate packing items
    const itemsSet = new Set();
    computed.forEach(d => d.activities.forEach(a => a.items.forEach(i => itemsSet.add(i))));
    const items = Array.from(itemsSet);

    // compute cultural highlights from dataset (unique activity names with 'Culture' tag)
    const highlightsSet = new Set();
    dataset.forEach(d => d.activities.forEach(a => { if (a.tags.includes('Culture')) highlightsSet.add(a.name); }));
    const highlightsArr = Array.from(highlightsSet);

    const version = { itinerary: computed, packing: items, highlights: highlightsArr, createdAt: new Date().toISOString() };
    // store silently (do not show versions UI)
    localStorage.setItem(storageKey, JSON.stringify(version));

    setCurrentItinerary(computed);
    setPacking(items);
    setHighlights(highlightsArr);
  }, [mode, prefs, environment]);

  const togglePref = (p) => {
    setPrefs(prev => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const toggleExpand = (idx) => setExpanded(prev => (prev === idx ? null : idx));

 

  return (
    <div>
      <div className="activities-page">
        <div className="spacer" />

        <div className="activities-layout">
          <aside className="left-panel">
            <h3 className="panel-heading">TripMate</h3>
            <div className="panel-section">
              <strong>Trip</strong>
              <div>5 days</div>
            </div>
            <div className="panel-section">
              <strong>Weather</strong>
              <div>☀️ Partly Cloudy</div>
            </div>

            <div className="panel-section">
              <strong>Preferences</strong>
              <div className="prefs-list">
                {PREFS.map(p => (
                  <label key={p}><input type="checkbox" checked={prefs.has(p)} onChange={() => togglePref(p)} /> {p}</label>
                ))}
              </div>
            </div>

            <div className="panel-section">
              <strong>Activity Type</strong>
              <div className="radio-list">
                <label><input name="env" type="radio" checked={environment === 'both'} onChange={() => setEnvironment('both')} /> Both</label>
                <br />
                <label><input name="env" type="radio" checked={environment === 'indoor'} onChange={() => setEnvironment('indoor')} /> Indoor</label>
                <br />
                <label><input name="env" type="radio" checked={environment === 'outdoor'} onChange={() => setEnvironment('outdoor')} /> Outdoor</label>
              </div>
            </div>


          </aside>

          <main className="center-panel">
            <h2 className="panel-heading">Activities & Itinerary</h2>

            <div className="tab-bar">
              <div className={`tab ${mode === 'relaxed' ? 'active' : ''}`} onClick={() => setMode('relaxed')}>Relaxed</div>
              <div className={`tab ${mode === 'active' ? 'active' : ''}`} onClick={() => setMode('active')}>Active</div>
            </div>

            <div>
              {/* Show all days but only the day labels until expanded */}
              {currentItinerary.map((d, idx) => (
                <div key={d.day} className={`day-card ${expanded === idx ? 'open' : ''}`}>
                  <div className="day-row" onClick={() => toggleExpand(idx)}>
                    <div className="day-label">
                      <div>{d.day}</div>
                    </div>
                    <div className={`chevron ${expanded === idx ? 'open' : ''}`}>{expanded === idx ? '˅' : '›'}</div>
                  </div> 

                  {expanded === idx && (
                    <div className="expanded-content">
                      <ul className="activity-list">
                        {d.activities.map(act => (
                          <li key={act.id} className="activity-item">
                            <div className="activity-name">{act.name}</div>
                            {act.description && <div className="small-title">{act.description}</div>}
                            <ul className="activity-meta-list">
                              <li><strong>What to wear:</strong> {act.wear}</li>
                              <li><strong>Items:</strong> {act.items.join(', ')}</li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>

          <aside className="right-panel">
            <h4 className="panel-heading">Packing List (Summary)</h4>
            {packing.length === 0 ? <div className="small-title">No items required.</div> : (
              <div className="packing-list">
                {packing.map(item => (
                  <label key={item}><input type="checkbox" /> {item}</label>
                ))}
              </div>
            )}

            <div className="small-spacer" />

            <h4 className="panel-heading">Cultural Highlights</h4>
            {highlights.length === 0 ? (
              <div className="small-title">No cultural highlights for this selection.</div>
            ) : (
              <ul className="highlights-list">
                {highlights.map(h => (
                  <li key={h}>🎭 {h}</li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Activities;