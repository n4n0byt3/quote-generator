import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import App from './App';

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function Main() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setQuote(json[0]);
      });
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }

  return (
    <main>
      <h1>Quote Generator</h1>
      <section>
        <button onClick={getNewQuote}>New Quote</button>
        <h3>
          <span>“</span>
          {quote?.text}
        </h3>
        <i>- {quote?.author}</i>
        <Link to="/share">Share</Link>
      </section>
    </main>
  );
}

function SharePage({ quote }) {
  function shareOnTwitter() {
    const tweetText = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  }

  function shareOnInstagram() {
    const igText = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    const igUrl = `https://www.instagram.com/?url=${igText}`;
    window.alert('You will be redirected to the Instagram website to share the quote.');
    window.open(igUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <h2>Share on social media:</h2>
      <button onClick={shareOnTwitter}>Share on Twitter</button>
      <button onClick={shareOnInstagram}>Share on Instagram</button>
    </div>
  );
}

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setQuote(json[0]);
      });
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Main
              quotes={quotes}
              quote={quote}
              getNewQuote={getNewQuote}
            />
          }
        />
        <Route path="/share" element={<SharePage quote={quote} />} />
      </Routes>
    </BrowserRouter>
  );
}