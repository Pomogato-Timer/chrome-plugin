/* @vite-ignore */
import "./Clouds.css";
import Cloud1 from "./Cloud-1.png";
import Cloud1flip from "./Cloud-1-flip.png";
import Cloud2 from "./Cloud-2.png";
import Cloud2flip from "./Cloud-2-flip.png";
import Cloud3 from "./Cloud-3.png";
import Cloud3flip from "./Cloud-3-flip.png";


const cloudAssets = {
    1: Cloud1,
    2: Cloud1flip,
    3: Cloud2,
    4: Cloud2flip,
    5: Cloud3,
    6: Cloud3flip,
};

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Clouds() {
    return (
        <div className="clouds-container">
            {Array(50).fill(1).map((cloud, index) => (
                <img
                    style={{
                        position: "absolute",
                        top: `${getRandomInteger(60, 120)}px`,
                        left: `${-100 + getRandomInteger(120, 200) * (index)}px`,
                        animation: `moveClouds ${getRandomInteger(33, 50)}s linear infinite`
                    }}
                    key={index}
                    src={cloudAssets[getRandomInteger(1, 6)]}
                    alt={`Cloud ${index + 1}`}
                    className={`cloud cloud-${index}`}
                />
            ))}

            {Array(50).fill(1).map((cloud, index) => (
                <img
                    style={{
                        position: "absolute",
                        top: `${getRandomInteger(0, 45)}px`,
                        left: `${-300 + getRandomInteger(64, 120) * (index)}px`,
                        animation: `moveClouds ${getRandomInteger(30, 45)}s linear infinite`
                    }}
                    key={index}
                    src={cloudAssets[getRandomInteger(1, 6)]}
                    alt={`Cloud ${index + 1}`}
                    className={`cloud cloud-${index}`}
                />
            ))}

            {Array(50).fill(1).map((cloud, index) => (
                <img
                    style={{
                        position: "absolute",
                        top: `${getRandomInteger(130, 200)}px`,
                        left: `${-60 + getRandomInteger(64, 120) * (index)}px`,
                        animation: `moveClouds ${getRandomInteger(30, 45)}s linear infinite`
                    }}
                    key={index}
                    src={cloudAssets[getRandomInteger(1, 6)]}
                    alt={`Cloud ${index + 1}`}
                    className={`cloud cloud-${index}`}
                />
            ))}
        </div>
    );
};
