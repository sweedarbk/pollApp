import { useState, useEffect } from "react";
import "./App.css";
import Poll from "./components/Poll";
import { doc, onSnapshot } from "firebase/firestore";
import db from "./config/firebase";

const App = () => {
  const [poll, setPoll] = useState(null);
  const pollDocId = "1PwZI4BIV3stimJeTL2e"; // Document ID for the poll

  // Fetch poll data from Firestore and set up real-time listener
  useEffect(() => {
    const pollRef = doc(db, "languagePoll", pollDocId);

    const unsubscribe = onSnapshot(pollRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log("Poll data fetched:", docSnapshot.data());
        setPoll(docSnapshot.data());
      } else {
        console.error("Poll document does not exist!");
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [pollDocId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {poll ? (
        <Poll
          question={poll.question}
          choices={poll.choices}
          pollDocId={pollDocId}
        />
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
  );
};

export default App;
