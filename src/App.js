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
  number: '',
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

const PlayerMarker = ({ slot, player, index }) => (
  <div className="player-marker" style={{ left: `${slot.x}%`, top: `${slot.y}%` }}>
    <div className="player-card">
      <div className="player-photo">
        {player.photo ? (
          <img src={player.photo} alt={player.name || slot.position} />
        ) : (
          <span>{player.number || slot.position}</span>
        )}
      </div>
      <div className="player-number" aria-hidden="true">{player.number || index + 1}</div>
      <div className="player-banner">
        <span className="player-name">{player.name || `Player ${index + 1}`}</span>
        <span className="player-role">{slot.label}</span>
      </div>
    </div>
  </div>
);

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
      <svg className="pitch-markings" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
        <rect x="8" y="8" width="384" height="184" rx="12" ry="12" fill="none" stroke="white" strokeWidth="3" />
        <line x1="200" y1="8" x2="200" y2="192" stroke="white" strokeWidth="2.4" />
        <line x1="96" y1="8" x2="96" y2="192" stroke="white" strokeWidth="1.6" strokeDasharray="10 8" />
        <line x1="304" y1="8" x2="304" y2="192" stroke="white" strokeWidth="1.6" strokeDasharray="10 8" />

        <rect x="2" y="78" width="12" height="44" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="3" />
        <rect x="386" y="78" width="12" height="44" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="3" />

        <path d="M 20 78 A 44 44 0 0 1 20 122" fill="none" stroke="white" strokeWidth="2.4" />
        <path d="M 380 78 A 44 44 0 0 0 380 122" fill="none" stroke="white" strokeWidth="2.4" />

        <line x1="64" y1="78" x2="20" y2="78" stroke="white" strokeWidth="2" />
        <line x1="64" y1="122" x2="20" y2="122" stroke="white" strokeWidth="2" />
        <line x1="380" y1="78" x2="336" y2="78" stroke="white" strokeWidth="2" />
        <line x1="380" y1="122" x2="336" y2="122" stroke="white" strokeWidth="2" />

        <circle cx="40" cy="100" r="3.5" fill="white" />
        <circle cx="360" cy="100" r="3.5" fill="white" />
      </svg>

      {formationPlayers.map(({ slot, player }, index) => (
        <PlayerMarker key={slot.id} slot={slot} player={player} index={index} />
      ))}
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

    <label className="field">
      <span>Number</span>
      <input
        type="text"
        value={player.number}
        onChange={(event) => onPlayerChange(slot.id, 'number', event.target.value)}
        placeholder="e.g. 10"
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