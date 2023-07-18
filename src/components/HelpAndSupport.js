import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const HelpAndSupport = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { checkAdmin } = UserAuth();

  useEffect(() => {
    checkAdmin().then((result) => setIsAdmin(result));
    const unsubscribe = onSnapshot(collection(db, "faqs"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(newData);
    });
    return unsubscribe;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Please enter a question and an answer");
      return;
    }
    try {
      await addDoc(collection(db, "faqs"), { question, answer });
      setQuestion("");
      setAnswer("");
    } catch (e) {
      console.error("Error adding FAQ: ", e);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3">Help and Support</h1>
      <h2 className="my-3">FAQs</h2>
      <ul className="list-group mb-3">
        {faqs.map((faq) => (
          <li key={faq.id} className="list-group-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p> 
          </li>
        ))}
      </ul>
      {isAdmin && (
        <>
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add FAQ"}
          </button>
          {showForm && (
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Question:
                </label>
                <input
                  type="text"
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  Answer:
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default HelpAndSupport;
