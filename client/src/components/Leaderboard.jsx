import { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Could not load leaderboard.');
      }
    };

    fetchLeaderboard();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-secondary-800 shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Top Note Takers</h2>
      <ol className="list-decimal list-inside">
        {leaderboard.map((user, index) => (
          <li key={index} className="text-secondary-700 dark:text-secondary-300 py-1">
            {user.email} - {user.note_count} notes
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
