import React, { useMemo, useState } from 'react';
import './App.css';

const FORMATIONS = {
  '1-4-4-2': [
    { id: 'gk', position: 'GK', label: 'Goalkeeper', x: 7, y: 50 },
    { id: 'lb', position: 'LB', label: 'Left Back', x: 22, y: 18 },
    { id: 'lcb', position: 'LCB', label: 'Left Centre Back', x: 22, y: 38 },
    { id: 'rcb', position: 'RCB', label: 'Right Centre Back', x: 22, y: 62 },
    { id: 'rb', position: 'RB', label: 'Right Back', x: 22, y: 82 },
    { id: 'ldm', position: 'LM', label: 'Left Midfield', x: 45, y: 26 },
    { id: 'cdm', position: 'CM', label: 'Centre Midfield', x: 38, y: 50 },
    { id: 'cam', position: 'AM', label: 'Attacking Midfield', x: 58, y: 50 },
    { id: 'rdm', position: 'RM', label: 'Right Midfield', x: 45, y: 74 },
    { id: 'lf', position: 'LF', label: 'Left Forward', x: 80, y: 34 },
    { id: 'rf', position: 'RF', label: 'Right Forward', x: 80, y: 66 }
  ],
  '1-3-2-3-2': [
    { id: 'gk', position: 'GK', label: 'Goalkeeper', x: 7, y: 50 },
    { id: 'lb', position: 'LB', label: 'Left Back', x: 22, y: 24 },
    { id: 'cb', position: 'CB', label: 'Centre Back', x: 22, y: 50 },
    { id: 'rb', position: 'RB', label: 'Right Back', x: 22, y: 76 },
    { id: 'ls', position: 'LS', label: 'Left Screen', x: 37, y: 36 },
    { id: 'rs', position: 'RS', label: 'Right Screen', x: 37, y: 64 },
    { id: 'lm', position: 'LM', label: 'Left Midfield', x: 58, y: 22 },
    { id: 'cm', position: 'CM', label: 'Centre Midfield', x: 58, y: 50 },
    { id: 'rm', position: 'RM', label: 'Right Midfield', x: 58, y: 78 },
    { id: 'lf', position: 'LF', label: 'Left Forward', x: 82, y: 36 },
    { id: 'rf', position: 'RF', label: 'Right Forward', x: 82, y: 64 }
  ]
};

const createEmptyPlayer = () => ({
  name: '',
  photo: ''
});

const buildInitialPlayers = () => {
  const initial = {};
  Object.values(FORMATIONS).forEach((lineup) => {
    lineup.forEach((slot) => {
      if (!initial[slot.id]) {
        initial[slot.id] = createEmptyPlayer();
      }
    });
  });
  return initial;
};

const formatFormationLabel = (formationKey) => formationKey.split('-').join(' – ');

const projectPlayerPosition = (slot) => {
  const depth = slot.y / 100;
  const widthScale = 0.55 + depth * 0.45;
  const left = 50 + (slot.x - 50) * widthScale;
  const curve = Math.pow(depth, 1.35);
  const top = 8 + curve * 82;
  const scale = 0.62 + depth * 0.45;
  const shadow = 0.18 + depth * 0.35;

  return {
    left: `${left}%`,
    top: `${top}%`,
    '--player-scale': scale,
    '--player-shadow': shadow,
    zIndex: Math.round(depth * 100) + 5
  };
};

const FormationSelector = ({ formationKey, onSelect }) => (
  <div className="formation-selector" role="tablist" aria-label="Formation selector">
    {Object.keys(FORMATIONS).map((key) => {
      const isActive = formationKey === key;
      return (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={isActive}
          className={`formation-button${isActive ? ' active' : ''}`}
          onClick={() => onSelect(key)}
        >
          {formatFormationLabel(key)}
        </button>
      );
    })}
  </div>
);

const PlayerMarker = ({ slot, player, index }) => {
  const projectedStyle = projectPlayerPosition(slot);
  const displayName = player.name || `Player ${index + 1}`;

  return (
    <div className="player-marker" style={projectedStyle}>
      <div className="player-card">
        <div className="player-photo">
          {player.photo ? (
            <img src={player.photo} alt={player.name || slot.position} />
          ) : (
            <span>{slot.position}</span>
          )}
        </div>
        <div className="player-banner">
          <span className="player-name">{displayName}</span>
          <span className="player-role">{slot.label}</span>
        </div>
      </div>
    </div>
    );
};

const TeamBanner = ({ teamName }) => (
  <div className="team-banner" aria-live="polite">
    <div className="team-banner-emblem">🏑</div>
    <div className="team-banner-text">
      <span className="team-banner-title">Starting XI</span>
      <span className="team-banner-name">{teamName}</span>
    </div>
  </div>
);

const Pitch = ({ teamName, formationPlayers }) => (
  <section className="pitch-wrapper" aria-label="Lineup pitch preview">
    <div className="stadium-backdrop" aria-hidden="true" />
    <div className="stadium-floodlights" aria-hidden="true" />
    <div className="stadium-crowd" aria-hidden="true" />

    <div className="pitch" role="img" aria-label="Field hockey pitch with lineup">
       <div className="pitch-surface">
        <svg className="pitch-markings" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
          <rect x="12" y="12" width="376" height="216" rx="8" ry="8" fill="none" stroke="white" strokeWidth="3" />
          <line x1="12" y1="120" x2="388" y2="120" stroke="white" strokeWidth="2.2" />
          <line x1="12" y1="66.5" x2="388" y2="66.5" stroke="white" strokeWidth="1.8" />
          <line x1="12" y1="173.5" x2="388" y2="173.5" stroke="white" strokeWidth="1.8" />

          <path
            d="M 104 12 L 104 47 A 100 100 0 0 0 296 47 L 296 12"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
          />
          <path
            d="M 90 12 L 90 56 A 114 114 0 0 0 310 56 L 310 12"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <path
            d="M 104 228 L 104 193 A 100 100 0 0 1 296 193 L 296 228"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
          />
          <path
            d="M 90 228 L 90 184 A 114 114 0 0 1 310 184 L 310 228"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6 8"
          />

          <circle cx="200" cy="120" r="12" fill="none" stroke="white" strokeWidth="1.8" />
          <circle cx="200" cy="32" r="3.8" fill="white" />
          <circle cx="200" cy="208" r="3.8" fill="white" />

          <circle cx="200" cy="120" r="1.8" fill="white" />
        </svg>
      </div> 

         <div className="pitch-goal pitch-goal-home" aria-hidden="true">
        <div className="goal-frame">
          <div className="goal-post left" />
          <div className="goal-crossbar" />
          <div className="goal-post right" />
          <div className="goal-backboard" />
        </div>
        <div className="goal-net" />
      </div>

         <div className="pitch-goal pitch-goal-away" aria-hidden="true">
        <div className="goal-frame">
          <div className="goal-post left" />
          <div className="goal-crossbar" />
          <div className="goal-post right" />
          <div className="goal-backboard" />
        </div>
        <div className="goal-net" />
      </div>

       <div className="players-layer">
        {formationPlayers.map(({ slot, player }, index) => (
          <PlayerMarker key={slot.id} slot={slot} player={player} index={index} />
        ))}
      </div>
    </div>

    <TeamBanner teamName={teamName} />
  </section>
);

const PlayerEditor = ({ slot, player, index, onPlayerChange, onPhotoUpload }) => (
  <div className="player-editor">
    <div className="player-editor-header">
      <div className="player-index">{index + 1}</div>
      <div>
        <p className="player-position">{slot.label}</p>
        <span className="player-short">{slot.position}</span>
      </div>
    </div>

    <label className="field">
      <span>Player name</span>
      <input
        type="text"
        value={player.name}
        onChange={(event) => onPlayerChange(slot.id, 'name', event.target.value)}
        placeholder="e.g. Alex Morgan"
      />
    </label>

    <label className="field upload">
      <span>Player photo</span>
      <input type="file" accept="image/*" onChange={(event) => onPhotoUpload(slot.id, event)} />
    </label>
  </div>
);

const ControlPanel = ({
  teamName,
  onTeamNameChange,
  formationKey,
  formationPlayers,
  onPlayerChange,
  onPhotoUpload
}) => (
  <section className="control-panel" aria-label="Lineup controls">
    <div className="panel-header">
      <h2>Team Management</h2>
      <p>
        Update your squad details for the {formatFormationLabel(formationKey)} shape to refresh the broadcast graphic.
      </p>
    </div>

    <div className="team-name-field">
      <label htmlFor="team-name">Team name</label>
      <input
        id="team-name"
        type="text"
        value={teamName}
        onChange={(event) => onTeamNameChange(event.target.value)}
        placeholder="Enter your team name"
      />
    </div>

    <div className="player-grid">
      {formationPlayers.map(({ slot, player }, index) => (
        <PlayerEditor
          key={slot.id}
          slot={slot}
          player={player}
          index={index}
          onPlayerChange={onPlayerChange}
          onPhotoUpload={onPhotoUpload}
        />
      ))}
    </div>
  </section>
);

const FieldHockeyLineup = () => {
  const [formationKey, setFormationKey] = useState('1-4-4-2');
  const [teamName, setTeamName] = useState('Your Club Name');
  const [players, setPlayers] = useState(() => buildInitialPlayers());

  const currentFormation = FORMATIONS[formationKey];

  const formationPlayers = useMemo(
    () =>
      currentFormation.map((slot) => ({
        slot,
        player: players[slot.id] ?? createEmptyPlayer()
      })),
    [currentFormation, players]
  );

  const handlePlayerChange = (playerId, field, value) => {
    setPlayers((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (playerId, event) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      handlePlayerChange(playerId, 'photo', typeof result === 'string' ? result : '');
    };
    reader.onloadend = () => {
      input.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-badge">Broadcast Ready</div>
        <h1 className="hero-title">Field Hockey Lineup Builder</h1>
        <p className="hero-subtitle">
          Craft a line-up reveal that mirrors the electric atmosphere of the pre-match presentation.
        </p>

        <FormationSelector formationKey={formationKey} onSelect={setFormationKey} />
      </header>

      <main className="stadium" aria-label="Lineup preview and controls">
        <Pitch teamName={teamName} formationPlayers={formationPlayers} />
        <ControlPanel
          teamName={teamName}
          onTeamNameChange={setTeamName}
          formationKey={formationKey}
          formationPlayers={formationPlayers}
          onPlayerChange={handlePlayerChange}
          onPhotoUpload={handlePhotoUpload}
        />
      </main>
    </div>
  );
};

export default FieldHockeyLineup;