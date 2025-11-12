import React, { useState, useMemo } from 'react';
import PlayerCard from './PlayerCard';

function Leaderboard({ players, pinnedPlayer, onPin, onPlayerClick, searchQuery }) {
  const [sortBy, setSortBy] = useState('Win_Rate');

  // Filter players by search query
  const filteredPlayers = useMemo(() => {
    if (!searchQuery) return players;
    const query = searchQuery.toLowerCase();
    return players.filter(player =>
      player.Player.toLowerCase().includes(query)
    );
  }, [players, searchQuery]);

  // Sort players
  const sortedPlayers = useMemo(() => {
    const sorted = [...filteredPlayers];
    
    // Separate pinned player if exists
    let pinned = null;
    if (pinnedPlayer) {
      const pinnedIndex = sorted.findIndex(p => p.Player === pinnedPlayer);
      if (pinnedIndex !== -1) {
        pinned = sorted.splice(pinnedIndex, 1)[0];
      }
    }

    // Sort the rest
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'Win_Rate':
          return b.Win_Rate - a.Win_Rate;
        case 'Rating_Mu':
          return b.Rating_Mu - a.Rating_Mu;
        default:
          return b.Win_Rate - a.Win_Rate;
      }
    });

    // Add pinned player at the top if exists
    if (pinned) {
      sorted.unshift(pinned);
    }

    return sorted;
  }, [filteredPlayers, sortBy, pinnedPlayer]);

  // Calculate display rank (accounting for pinned player)
  const getDisplayRank = (player, index) => {
    if (pinnedPlayer && player.Player === pinnedPlayer) {
      return '📌';
    }
    // Show position based on current sort order
    return index + 1;
  };

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Sort by:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Win_Rate">Win Rate</option>
          <option value="Rating_Mu">Rating (μ)</option>
        </select>
        {pinnedPlayer && (
          <div className="ml-auto text-sm text-blue-600 dark:text-blue-400">
            📌 Pinned: {pinnedPlayer}
          </div>
        )}
      </div>

      {/* Leaderboard - One player per row */}
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <PlayerCard
            key={player.Player}
            player={player}
            rank={getDisplayRank(player, index)}
            isPinned={player.Player === pinnedPlayer}
            onPin={onPin}
            onClick={() => onPlayerClick(player)}
            sortBy={sortBy}
          />
        ))}
      </div>

      {sortedPlayers.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No players found matching your search.
        </div>
      )}
    </div>
  );
}

export default Leaderboard;

