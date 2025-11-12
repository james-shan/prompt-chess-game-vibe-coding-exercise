import React from 'react';

function PlayerCard({ player, rank, isPinned, onPin, onClick, sortBy }) {
  // Convert rank to number for comparison (handles pinned player case where rank is '📌')
  const rankNumber = typeof rank === 'number' ? rank : (rank === '📌' ? 0 : parseInt(rank) || 0);
  const isTopThree = rankNumber > 0 && rankNumber <= 3;
  const isHighWinRate = player.Win_Rate > 0.8;
  
  // Get medal colors for top 3
  const getMedalStyle = (rank) => {
    if (rank === 1) {
      return {
        bg: 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-50 dark:from-yellow-900/30 dark:via-yellow-800/30 dark:to-amber-900/30',
        border: 'border-yellow-400 dark:border-yellow-500',
        text: 'text-yellow-700 dark:text-yellow-300',
        rankBg: 'bg-yellow-400 dark:bg-yellow-500',
        rankText: 'text-yellow-900 dark:text-yellow-100'
      };
    }
    if (rank === 2) {
      return {
        bg: 'bg-gradient-to-br from-gray-50 via-gray-100 to-slate-50 dark:from-gray-800/30 dark:via-gray-700/30 dark:to-slate-800/30',
        border: 'border-gray-400 dark:border-gray-500',
        text: 'text-gray-700 dark:text-gray-300',
        rankBg: 'bg-gray-400 dark:bg-gray-500',
        rankText: 'text-gray-900 dark:text-gray-100'
      };
    }
    if (rank === 3) {
      return {
        bg: 'bg-gradient-to-br from-orange-50 via-amber-100 to-orange-50 dark:from-orange-900/30 dark:via-amber-800/30 dark:to-orange-900/30',
        border: 'border-orange-400 dark:border-orange-500',
        text: 'text-orange-700 dark:text-orange-300',
        rankBg: 'bg-orange-400 dark:bg-orange-500',
        rankText: 'text-orange-900 dark:text-orange-100'
      };
    }
    return null;
  };

  const medalStyle = getMedalStyle(rankNumber);

  const cardClasses = `
    relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer w-full
    ${medalStyle ? `${medalStyle.bg} ${medalStyle.border}` : ''}
    ${isHighWinRate && !isTopThree ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-400' : ''}
    ${!isTopThree && !isHighWinRate ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md' : ''}
    ${isPinned ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {isTopThree && medalStyle ? (
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${medalStyle.rankBg} ${medalStyle.rankText} shadow-md`}>
              #{rank}
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              #{rank}
            </span>
          )}
          <h3 className={`text-lg font-semibold ${medalStyle ? medalStyle.text : 'text-gray-800 dark:text-gray-200'}`}>
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

