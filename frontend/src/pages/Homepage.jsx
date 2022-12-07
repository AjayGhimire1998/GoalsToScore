import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const staticTextNodeOne = `<h2>Finding it difficult to manage your daily goals?</h2>`;
  const staticTextNodeTwo = `<h2>Welcome to the ultimate Goals Management App</h2>`;
  const staticTextNodeThree = `<h1>GoalsToScore</h1>`;
  const startButton = `<button class="btn btn-start">Get Started</button>`;

  const navigate = useNavigate();
  // const typeWritter = async (text) => {
  //   const letters = text.split("");
  //   let i = 0;
  //   while (i < text.length) {
  //     await new Promise((resolve) => setTimeout(resolve, 100))
  //     await document.querySelector(".parent-intro").append(letters[i]);
  //     i++;
  //   }
  //   return;
  // };



  function staticTextsFlow() {
    setTimeout(() => {
      document.querySelector(".parent-intro").innerHTML = staticTextNodeOne;
    }, 100);
    setTimeout(() => {
      document.querySelector(".parent-intro").innerHTML = staticTextNodeTwo;
    }, 2000);
    setTimeout(() => {
      document.querySelector(".parent-intro").innerHTML = staticTextNodeThree;
    }, 4000);
    setTimeout(() => {
      document.querySelector(".parent-intro").innerHTML = startButton;
    }, 6000);
    document.querySelector(".parent-intro").addEventListener('click', () => {
      navigate('/login')
    })
  }

  useEffect(() => {
    staticTextsFlow();
  }, [navigate]);

  return (
    <div className="container">
      <div>
        <div className="parent-intro"></div>
      </div>
      <br />
    </div>
  );
}

export default Homepage;
