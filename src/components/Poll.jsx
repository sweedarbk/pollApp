import React, { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../config/firebase";

const Poll = ({ question, choices, pollDocId }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (index) => {
    if (hasVoted) return;

    const pollRef = doc(db, "languagePoll", pollDocId);

    // Update the votes for the selected choice
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, votes: choice.votes + 1 } : choice
    );

    try {
      await updateDoc(pollRef, { choices: updatedChoices });
      setHasVoted(true);
    } catch (error) {
      console.error("Error updating votes: ", error);
    }
  };

  const totalVotes =
    choices?.reduce((sum, choice) => sum + choice.votes, 0) || 0;

  return (
    <div className="p-4 shadow-md rounded-md bg-slate-800 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">{question}</h1>
      {choices.map((choice, index) => (
        <div key={index} className="mb-4">
          {!hasVoted ? (
            <button
              onClick={() => handleVote(index)}
              className="w-full bg-violet-800 text-white py-2 rounded-md hover:bg-purple-600 transition"
            >
              {choice.label}
            </button>
          ) : (
            <div>
              <p className="font-semibold">{choice.label}</p>
              <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden">
                <div
                  className="bg-violet-800 h-4"
                  style={{
                    width: `${(choice.votes / totalVotes) * 100 || 0}%`,
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </div>
              <p className="text-sm text-white">
                {((choice.votes / totalVotes) * 100 || 0).toFixed(1)}% (
                {choice.votes} votes)
              </p>
            </div>
          )}
        </div>
      ))}
      {hasVoted && (
        <p className="mt-4 text-green-500 font-semibold">Thanks for voting!</p>
      )}
    </div>
  );
};

export default Poll;
