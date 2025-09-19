import React, { useState } from 'react';
import { Upload, Users, Trophy } from 'lucide-react';

const FieldHockeyLineup = () => {
  const [formation, setFormation] = useState('1-4-4-2');
  const [players, setPlayers] = useState({});

  // Formation positions (x, y coordinates as percentages) - Fixed for proper spacing
  const formations = {
    '1-4-4-2': [
      { id: 'gk', position: 'GK', x: 5, y: 50, label: 'Goalkeeper' },
      { id: 'lb', position: 'LB', x: 20, y: 15, label: 'Left Back' },
      { id: 'lcb', position: 'LCB', x: 20, y: 35, label: 'Left Centre Back' },
      { id: 'rcb', position: 'RCB', x: 20, y: 65, label: 'Right Centre Back' },
      { id: 'rb', position: 'RB', x: 20, y: 85, label: 'Right Back' },
      { id: 'ldm', position: 'LM', x: 45, y: 25, label: 'Left Mid' },
      { id: 'cdm', position: 'CDM', x: 35, y: 50, label: 'Centre Mid' },
      { id: 'cam', position: 'CAM', x: 55, y: 50, label: 'Attacking Mid' },
      { id: 'rdm', position: 'RM', x: 45, y: 75, label: 'Right Mid' },
      { id: 'lf', position: 'LF', x: 80, y: 30, label: 'Left Forward' },
      { id: 'rf', position: 'RF', x: 80, y: 70, label: 'Right Forward' }
    ],
    '1-3-2-3-2': [
      { id: 'gk', position: 'GK', x: 5, y: 50, label: 'Goalkeeper' },
      { id: 'lb', position: 'LB', x: 20, y: 20, label: 'Left Back' },
      { id: 'cb', position: 'CB', x: 20, y: 50, label: 'Centre Back' },
      { id: 'rb', position: 'RB', x: 20, y: 80, label: 'Right Back' },
      { id: 'ldm', position: 'LS', x: 35, y: 35, label: 'Left Screen' },
      { id: 'rdm', position: 'RS', x: 35, y: 65, label: 'Right Screen' },
      { id: 'lm', position: 'LM', x: 55, y: 20, label: 'Left Mid' },
      { id: 'cm', position: 'CM', x: 55, y: 50, label: 'Centre Mid' },
      { id: 'rm', position: 'RM', x: 55, y: 80, label: 'Right Mid' },
      { id: 'lf', position: 'LF', x: 80, y: 35, label: 'Left Forward' },
      { id: 'rf', position: 'RF', x: 80, y: 65, label: 'Right Forward' }
    ]
  };

  const handlePlayerChange = (playerId, field, value) => {
    setPlayers(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (playerId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handlePlayerChange(playerId, 'photo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentFormation = formations[formation];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-400" size={40} />
            Field Hockey Lineup Tool
            <Trophy className="text-yellow-400" size={40} />
          </h1>
          
          {/* Formation Selector */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setFormation('1-4-4-2')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                formation === '1-4-4-2' 
                  ? 'bg-white text-green-800 shadow-lg' 
                  : 'bg-green-700 text-white hover:bg-green-600'
              }`}
            >
              1-4-4-2 Formation
            </button>
            <button
              onClick={() => setFormation('1-3-2-3-2')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                formation === '1-3-2-3-2' 
                  ? 'bg-white text-green-800 shadow-lg' 
                  : 'bg-green-700 text-white hover:bg-green-600'
              }`}
            >
              1-3-2-3-2 Formation
            </button>
          </div>
        </div>

        {/* FIELD HOCKEY PITCH - Proper horizontal layout */}
        <div className="mb-8">
          <div className="relative bg-green-600 rounded-2xl shadow-2xl p-6 border-4 border-white">
            {/* Stadium atmosphere */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-red-600 to-yellow-600 opacity-20 rounded-3xl blur-sm"></div>
            
            {/* Field Hockey Pitch - Horizontal orientation */}
            <div className="relative w-full h-80 bg-green-500 rounded-lg border-4 border-white shadow-inner overflow-hidden">
              {/* Pitch markings - Corrected for field hockey */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                {/* Field boundary */}
                <rect x="10" y="10" width="380" height="180" fill="none" stroke="white" strokeWidth="2"/>
                
                {/* Center line */}
                <line x1="200" y1="10" x2="200" y2="190" stroke="white" strokeWidth="2"/>
                
                {/* Goals */}
                <rect x="5" y="80" width="10" height="40" fill="none" stroke="white" strokeWidth="3"/>
                <rect x="385" y="80" width="10" height="40" fill="none" stroke="white" strokeWidth="3"/>
                
                {/* Shooting circles (D-areas) - Proper field hockey semicircles */}
                <path d="M 10 80 A 40 40 0 0 1 10 120" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M 390 80 A 40 40 0 0 0 390 120" fill="none" stroke="white" strokeWidth="2"/>
                
                {/* Shooting circle lines */}
                <line x1="50" y1="80" x2="10" y2="80" stroke="white" strokeWidth="2"/>
                <line x1="50" y1="120" x2="10" y2="120" stroke="white" strokeWidth="2"/>
                <line x1="350" y1="80" x2="390" y2="80" stroke="white" strokeWidth="2"/>
                <line x1="350" y1="120" x2="390" y2="120" stroke="white" strokeWidth="2"/>
                
                {/* Penalty spots */}
                <circle cx="25" cy="100" r="2" fill="white"/>
                <circle cx="375" cy="100" r="2" fill="white"/>
                
                {/* 25-yard lines */}
                <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="1" strokeDasharray="5,5"/>
                <line x1="300" y1="10" x2="300" y2="190" stroke="white" strokeWidth="1" strokeDasharray="5,5"/>
              </svg>

              {/* Player positions - Fixed positioning to prevent overlap */}
              {currentFormation.map((pos, index) => {
                const player = players[pos.id] || {};
                return (
                  <div
                    key={pos.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                    }}
                  >
                    {/* Player display - broadcast style */}
                    <div className="relative group">
                      {/* Player photo circle */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-lg border-2 border-white flex items-center justify-center overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer">
                        {player.photo ? (
                          <img 
                            src={player.photo} 
                            alt={player.name || pos.position}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white font-bold text-xs">
                            {pos.position}
                          </div>
                        )}
                      </div>
                      
                      {/* Player number */}
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center border border-blue-600">
                        <span className="text-blue-800 font-bold text-xs">{index + 1}</span>
                      </div>
                      
                      {/* Player name banner */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-2 py-1 rounded shadow-lg min-w-max">
                          <div className="text-center">
                            <div className="text-xs font-bold uppercase">
                              {player.name || `PLAYER ${index + 1}`}
                            </div>
                            <div className="text-xs opacity-75">{pos.position}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Team name banner */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-8 py-3 rounded-lg shadow-2xl border border-white">
              <h2 className="text-xl font-bold uppercase tracking-wide">YOUR TEAM NAME</h2>
            </div>
          </div>
        </div>

        {/* Player Management Panel */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <Users size={28} />
            Team Management - {formation} Formation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentFormation.map((pos, index) => {
              const player = players[pos.id] || {};
              return (
                <div key={pos.id} className="bg-green-50 rounded-lg p-4 border-2 border-green-200 hover:border-green-400 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">{pos.label}</h3>
                      <p className="text-sm text-green-600">{pos.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Player name"
                      value={player.name || ''}
                      onChange={(e) => handlePlayerChange(pos.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-green-700 hover:text-green-800 transition-colors">
                      <Upload size={14} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(pos.id, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white opacity-80">
          <p className="text-lg">🏑 Ready for tomorrow's match! 🏑</p>
        </div>
      </div>
    </div>
  );
};

export default FieldHockeyLineup;