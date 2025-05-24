import React, { useState } from "react";
import img1 from "./assets/img1.webp";
import img2 from "./assets/img2.webp";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.webp";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.webp";
import img8 from "./assets/img8.webp";
import img9 from "./assets/img9.jpg";
import img10 from "./assets/img10.webp";

// Array of images, headings, and content
const slides = [
    {
        heading: "Gujarat Titans (GT)",
        url: img1,
        content: "The Gujarat Titans are the new kids on the block who walked in, saw the IPL trophy, and said, “Yeah, we’ll take that.” With a squad that plays like they’ve got cheat codes enabled, GT’s secret weapon is their ability to turn any match into a nail-biter – for the other team. Their fans have already mastered the art of celebrating early, because with these titans, even the last-over thrillers somehow end in their favor. If cricket had a ‘plot armor’ award, GT would win it every season."
    },
    {
        heading: "Royal Challengers Bangalore (RCB)",
        url: img2,
        content: "RCB are the eternal heartbreakers of the IPL. Their motto? “Ee sala cup namde!” (This year, the cup is ours!) But somehow, the cup keeps getting lost on the way to Bangalore. With a fanbase that’s more loyal than your WiFi connection and a batting lineup that can set the stadium on fire, RCB matches are a rollercoaster – thrilling, unpredictable, and occasionally leaving you upside down. Virat’s aggression, Faf’s calm, and a bowling unit that loves drama – RCB is the Bollywood of IPL!"
    },
    {
        heading: "Punjab Kings (PBKS)",
        url: img3,
        content: "Punjab Kings are the party animals of the IPL. Their matches are less about cricket and more about a festival, complete with bhangra, dhol, and the hope that this year, the Kings will finally find their crown. PBKS can chase any target – except consistency. Their team meetings probably involve more jokes than strategies, but when they click, it’s pure Punjabi magic on the field. Every season, their fans say, “Next year, pakka!” and honestly, we’re all rooting for that miracle."
    },
    {
        heading: "Mumbai Indians (MI)",
        url: img4,
        content: "Mumbai Indians are the IPL’s answer to a blockbuster sequel – always star-studded, always dramatic, and somehow, always making a comeback. With Rohit Sharma’s nonchalant sixes and Jasprit Bumrah’s toe-crushing yorkers, MI matches are like a masterclass in cricket and coolness. Their trophy cabinet is so full, they’re probably using one as a flower vase. MI’s secret? They believe in peaking at the right time – usually after giving their fans a few heart attacks."
    },
    {
        heading: "Delhi Capitals (DC)",
        url: img5,
        content: "Delhi Capitals are the team that keeps reinventing itself. One year they’re the Daredevils, the next they’re the Capitals – but the chaos remains constant. Rishabh Pant’s wild swings, Prithvi Shaw’s fearless starts, and a bowling attack that can go from genius to generous in a single over, DC matches are a crash course in unpredictability. Their fans have learned to expect the unexpected, and honestly, that’s half the fun."
    },
    {
        heading: "Kolkata Knight Riders (KKR)",
        url: img6,
        content: "KKR is the team with the most swag – and the coolest anthem. Whether it’s Andre Russell smashing balls into orbit or Sunil Narine confusing batsmen with his mystery spin, KKR matches are pure entertainment. Their purple jersey is basically a superhero costume, and Eden Gardens is their secret lair. With King Khan cheering from the stands, KKR believes in “Korbo, Lorbo, Jeetbo” (Do, Fight, Win) – and occasionally, “Dancebo” after a win."
    },
    {
        heading: "Lucknow Super Giants (LSG)",
        url: img7,
        content: "Lucknow Super Giants are the IPL’s latest experiment gone spectacularly right. They play like they’ve been around for decades, not just a few seasons. With KL Rahul’s elegance and a squad that’s as unpredictable as UP weather, LSG matches are a treat. Their strategy? Mix experience with wildcards, throw in some last-over drama, and keep everyone guessing. If there’s a team that can pull a rabbit out of a hat, it’s definitely LSG."
    },
    {
        heading: "Sunrisers Hyderabad (SRH)",
        url: img8,
        content: "Sunrisers Hyderabad are the silent assassins of the IPL. They don’t make much noise, but suddenly, you realize they’re in the playoffs again. With Rashid Khan’s magic spin and a bowling attack that’s tighter than your jeans after Diwali, SRH specializes in defending impossible totals. Their orange army is as bright as their jerseys, and their motto is simple: “Let the batters have nightmares.” If you underestimate SRH, you’re already out."
    },
    {
        heading: "Rajasthan Royals (RR)",
        url: img9,
        content: "Rajasthan Royals are the fairy-tale team of the IPL. They won the first-ever IPL and have been chasing that magic ever since. With Sanju Samson’s stylish strokes and a squad that loves to discover new talent, RR matches are a mix of drama, hope, and the occasional miracle. Their fans believe in destiny, and every season, they’re convinced the stars will align for another royal triumph. Pink isn’t just a color for them – it’s an attitude."
    },
    {
        heading: "Chennai Super Kings (CSK)",
        url: img10,
        content: "Chennai Super Kings are the wise old lions of the IPL. Led by Thala Dhoni, CSK is the cricketing equivalent of a well-oiled machine – calm, composed, and always in control. Their yellow jersey is legendary, and their fans treat every match like a festival. With Jadeja’s lightning fielding and Gaikwad’s elegant batting, CSK proves that age is just a number – and experience is everything. When in doubt, trust the process – and trust CSK to make a comeback!\n\nLet the IPL madness begin!"
    }
];

function App() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");
    const [animating, setAnimating] = useState(false);

    const handlePrev = () => {
        if (animating) return;
        setDirection("left");
        setAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            setAnimating(false);
        }, 400);
    };

    const handleNext = () => {
        if (animating) return;
        setDirection("right");
        setAnimating(true);
        setTimeout(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            setAnimating(false);
        }, 400);
    };

    // Animation logic
    const getImageStyle = () => ({
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "0 20px 20px 0",
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
        transition: "transform 0.4s cubic-bezier(.77,0,.18,1), opacity 0.4s",
        transform: animating
            ? direction === "right"
                ? "translateX(-100%)"
                : "translateX(100%)"
            : "translateX(0)",
        opacity: animating ? 0 : 1
    });

    const getContentStyle = () => ({
        padding: "40px",
        fontSize: "1.5rem",
        color: "#222",
        display: "flex",
        alignItems: "center",
        height: "100%",
        transition: "transform 0.4s cubic-bezier(.77,0,.18,1), opacity 0.4s",
        transform: animating
            ? direction === "right"
                ? "translateX(100%)"
                : "translateX(-100%)"
            : "translateX(0)",
        opacity: animating ? 0 : 1
    });

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                overflow: "hidden",
                background: "#f5f5f5"
            }}
        >
            {/* Left: Image */}
            <div
                style={{
                    width: "50vw",
                    height: "100vh",
                    position: "relative",
                    background: "#222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <img
                    src={slides[current].url}
                    alt=""
                    style={getImageStyle()}
                />
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    disabled={animating}
                    style={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "2.5rem",
                        background: "rgba(255,255,255,0.7)",
                        border: "none",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        cursor: animating ? "not-allowed" : "pointer",
                        zIndex: 2
                    }}
                >
                    &#8592;
                </button>
            </div>
            {/* Right: Content */}
            <div
                style={{
                    width: "50vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    position: "relative"
                }}
            >
                <div style={getContentStyle()}>
                    <div>
                        <h2 style={{ marginBottom: "1rem", color: "#ff9800" }}>
                            {slides[current].heading}
                        </h2>
                        <div>{slides[current].content}</div>
                    </div>
                </div>
                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    disabled={animating}
                    style={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "2.5rem",
                        background: "rgba(0,0,0,0.08)",
                        border: "none",
                        borderRadius: "50%",
                        width: 48,
                        height: 48,
                        cursor: animating ? "not-allowed" : "pointer",
                        zIndex: 2
                    }}
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export default App;
