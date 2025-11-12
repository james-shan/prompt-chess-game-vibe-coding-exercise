import React from 'react';

function PlayerCard({ player, rank, isPinned, onPin, onClick, sortBy }) {
  const isTopThree = rank <= 3;
  const isHighWinRate = player.Win_Rate > 0.8;
  
  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const cardClasses = `
    relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer w-full
    ${isTopThree ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-400' : ''}
    ${isHighWinRate && !isTopThree ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-400' : ''}
    ${!isTopThree && !isHighWinRate ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md' : ''}
    ${isPinned ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {getRankIcon(rank) || `#${rank}`}
          </span>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {player.Player}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPin(player.Player);
          }}
          className={`px-3 py-1 rounded-lg transition-colors font-medium text-sm ${
            isPinned
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
          aria-label={isPinned ? 'Unpin player' : 'Pin player'}
        >
          {isPinned ? '📌 Unpin' : '📍 Pin'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Rating (μ)</span>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {player.Rating_Mu.toFixed(2)}
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Win Rate</span>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {(player.Win_Rate * 100).toFixed(1)}%
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">W-D-L</span>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {player.Wins}-{player.Draws}-{player.Losses}
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Games</span>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {player.Games}
          </p>
        </div>
      </div>

      {isHighWinRate && (
        <div className="mt-2 text-orange-600 dark:text-orange-400 font-semibold text-sm">
          🔥 High Win Rate!
        </div>
      )}
    </div>
  );
}

export default PlayerCard;

